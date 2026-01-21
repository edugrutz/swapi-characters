import { useParams, useNavigate } from "react-router-dom";
import { Descriptions, Tag, Spin, Alert, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCharacters } from "../../hooks/useCharacters";
import { useCharacterDetails } from "../../hooks/useCharacterDetails";
import { FilmModal, SpeciesModal, VehicleModal, StarshipModal, PlanetModal } from "../ResourceModals";
import { extractId } from "../../utils/extractId";
import { useHomeworld } from "../../hooks/useHomeworld";
import {
    ProfileContainer,
    ProfileHeader,
    ProfileTitle,
    ProfileContent,
    ProfileSection,
    SectionTitle,
    LoadingWrapper,
    ErrorButton,
    Capitalized,
    ResourceTagsWrapper,
    ResourceListWrapper,
} from "../../styles/antd/components/profile";

export function CharacterProfile() {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [modalsOpen, setModalsOpen] = useState({
        species: false,
        vehicle: false,
        starship: false,
        planet: false,
        film: false,
    });

    const [selectedIds, setSelectedIds] = useState<{
        species: string | null;
        vehicle: string | null;
        starship: string | null;
        planet: string | null;
        film: string | null;
    }>({
        species: null,
        vehicle: null,
        starship: null,
        planet: null,
        film: null,
    });

    const { data, isFetching, error } = useCharacters({ page: 1, search: name || "" });
    const character = data?.results?.[0];

    const { homeworld, isLoading: isLoadingHomeworld } = useHomeworld(character?.homeworld || null);
    const { films, species, vehicles, starships, isLoading: isLoadingDetails } =
        useCharacterDetails(character || null);

    type ModalType = "species" | "vehicle" | "starship" | "planet" | "film";

    const handleModalOpen = (modalType: ModalType, url: string) => {
        const id = extractId(url);
        setSelectedIds({ ...selectedIds, [modalType]: id });
        setModalsOpen({ ...modalsOpen, [modalType]: true });
    };

    const handleModalClose = (modalType: ModalType) => {
        setSelectedIds({ ...selectedIds, [modalType]: null });
        setModalsOpen({ ...modalsOpen, [modalType]: false });
    };

    const HandleViewResource = (modalType: ModalType, id: string) => {
        handleModalClose(modalType);
        navigate(`/${modalType}/${id}`);
    }

    if (isFetching) {
        return (
            <ProfileContainer>
                <LoadingWrapper>
                    <Spin size="large" />
                </LoadingWrapper>
            </ProfileContainer>
        );
    }

    if (error || !character) {
        return (
            <ProfileContainer>
                <Alert
                    message={t("error.loading")}
                    description={error?.message || t("error.character_not_found")}
                    type="error"
                    showIcon
                />
                <ErrorButton
                    type="primary"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/")}
                >
                    {t("profile.back")}
                </ErrorButton>
            </ProfileContainer>
        );
    }

    return (
        <ProfileContainer>
            <ProfileHeader>
                <ProfileTitle>{character.name}</ProfileTitle>
                <Button
                    type="default"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/")}
                    size="large"
                >
                    {t("profile.back")}
                </Button>
            </ProfileHeader>

            <ProfileContent>
                <ProfileSection>
                    <SectionTitle>{t("profile.basic_info")}</SectionTitle>
                    <Descriptions bordered column={1} size="small" className="custom-descriptions">
                        <Descriptions.Item label={t("table.columns.height")}>
                            {character.height} cm
                        </Descriptions.Item>
                        <Descriptions.Item label={t("table.columns.mass")}>
                            {character.mass} kg
                        </Descriptions.Item>
                        <Descriptions.Item label={t("table.columns.birth_year")}>
                            {character.birth_year}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("table.columns.gender")}>
                            <Capitalized>{character.gender}</Capitalized>
                        </Descriptions.Item>
                        <Descriptions.Item label={t("table.columns.hair_color")}>
                            <Capitalized>{character.hair_color}</Capitalized>
                        </Descriptions.Item>
                        <Descriptions.Item label={t("table.columns.skin_color")}>
                            <Capitalized>{character.skin_color}</Capitalized>
                        </Descriptions.Item>
                        <Descriptions.Item label={t("table.columns.eye_color")}>
                            <Capitalized>{character.eye_color}</Capitalized>
                        </Descriptions.Item>
                        <Descriptions.Item label={t("modal.homeworld")}>
                            {isLoadingHomeworld ? (
                                <Spin size="small" />
                            ) : homeworld ? (
                                <Tag
                                    color="orange"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleModalOpen("planet", character.homeworld)}
                                >
                                    {homeworld.name}
                                </Tag>
                            ) : "n/a"}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("modal.species")}>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                <ResourceTagsWrapper>
                                    {species.map((s) => (
                                        <Tag
                                            key={s.url}
                                            color="blue"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleModalOpen("species", s.url)}
                                        >
                                            {s.name}
                                        </Tag>
                                    ))}
                                    {species.length === 0 && "n/a"}
                                </ResourceTagsWrapper>
                            )}
                        </Descriptions.Item>
                    </Descriptions>
                </ProfileSection>

                <ResourceListWrapper>
                    <ProfileSection>
                        <SectionTitle>{t("modal.films")}</SectionTitle>
                        {isLoadingDetails ? (
                            <Spin size="small" />
                        ) : (
                            <ResourceTagsWrapper>
                                {films.map((f) => (
                                    <Tag
                                        key={f.url}
                                        color="gold"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleModalOpen("film", f.url)}
                                    >
                                        {f.title}
                                    </Tag>
                                ))}
                            </ResourceTagsWrapper>
                        )}
                    </ProfileSection>

                    {character.vehicles.length > 0 && (
                        <ProfileSection>
                            <SectionTitle>{t("modal.vehicles")}</SectionTitle>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                <ResourceTagsWrapper>
                                    {vehicles.map((v) => (
                                        <Tag
                                            key={v.url}
                                            color="green"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleModalOpen("vehicle", v.url)}
                                        >
                                            {v.name}
                                        </Tag>
                                    ))}
                                </ResourceTagsWrapper>
                            )}
                        </ProfileSection>
                    )}

                    {character.starships.length > 0 && (
                        <ProfileSection>
                            <SectionTitle>{t("modal.starships")}</SectionTitle>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                <ResourceTagsWrapper>
                                    {starships.map((s) => (
                                        <Tag
                                            key={s.url}
                                            color="purple"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleModalOpen("starship", s.url)}
                                        >
                                            {s.name}
                                        </Tag>
                                    ))}
                                </ResourceTagsWrapper>
                            )}
                        </ProfileSection>
                    )}
                </ResourceListWrapper>
            </ProfileContent>

            <FilmModal
                filmId={selectedIds.film}
                open={modalsOpen.film}
                onClose={() => setModalsOpen({ ...modalsOpen, film: false })}
                onViewFilm={(id) => HandleViewResource('film', id)}
            />
            <SpeciesModal
                speciesId={selectedIds.species}
                open={modalsOpen.species}
                onClose={() => setModalsOpen({ ...modalsOpen, species: false })}
            />
            <VehicleModal
                vehicleId={selectedIds.vehicle}
                open={modalsOpen.vehicle}
                onClose={() => setModalsOpen({ ...modalsOpen, vehicle: false })}
                onViewVehicle={(id) => HandleViewResource('vehicle', id)}
            />
            <StarshipModal
                starshipId={selectedIds.starship}
                open={modalsOpen.starship}
                onClose={() => setModalsOpen({ ...modalsOpen, starship: false })}
                onViewStarship={(id) => HandleViewResource('starship', id)}
            />
            <PlanetModal
                planetId={selectedIds.planet}
                open={modalsOpen.planet}
                onClose={() => setModalsOpen({ ...modalsOpen, planet: false })}
                onViewPlanet={(id) => HandleViewResource('planet', id)}
            />
        </ProfileContainer>
    );
}
