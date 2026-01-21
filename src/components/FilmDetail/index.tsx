import { useParams, useNavigate } from "react-router-dom";
import { Descriptions, Spin, Alert, Button, Tag } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchFilmById } from "../../services/swapiDetails";
import { useFilmDetails } from "../../hooks/useFilmDetails";
import { SpeciesModal, VehicleModal, StarshipModal, PlanetModal } from "../ResourceModals";
import { extractId } from "../../utils/extractId";
import {
    ProfileContainer,
    ProfileHeader,
    ProfileTitle,
    ProfileContent,
    ProfileSection,
    SectionTitle,
    LoadingWrapper,
    ErrorButton,
    ResourceTagsWrapper,
    ResourceListWrapper,
    CrawlBox,
} from "../../styles/antd/components/profile";

export function FilmDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [modalsOpen, setModalsOpen] = useState({
        species: false,
        vehicle: false,
        starship: false,
        planet: false,
    });

    const [selectedIds, setSelectedIds] = useState<{
        species: string | null;
        vehicle: string | null;
        starship: string | null;
        planet: string | null;
    }>({
        species: null,
        vehicle: null,
        starship: null,
        planet: null,
    });

    const { data: film, isLoading, error } = useQuery({
        queryKey: ["film", id],
        queryFn: () => fetchFilmById(id!),
        enabled: !!id,
    });

    const { characters, planets, starships, vehicles, species, isLoading: isLoadingDetails } = useFilmDetails(film);

    type ModalType = "species" | "vehicle" | "starship" | "planet";

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
    };

    const handleCharacterClick = (url: string) => {
        const characterName = characters.find(c => c.url === url)?.name;
        if (characterName) {
            navigate(`/character/${encodeURIComponent(characterName)}`);
        }
    };

    if (isLoading) {
        return (
            <ProfileContainer>
                <LoadingWrapper>
                    <Spin size="large" />
                </LoadingWrapper>
            </ProfileContainer>
        );
    }

    if (error || !film) {
        return (
            <ProfileContainer>
                <Alert
                    message={t("error.loading")}
                    description={error?.message || t("error.film_not_found")}
                    type="error"
                    showIcon
                />
                <ErrorButton
                    type="primary"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate(-1)}
                >
                    {t("common.back")}
                </ErrorButton>
            </ProfileContainer>
        );
    }

    return (
        <ProfileContainer>
            <ProfileHeader>
                <ProfileTitle className="star-wars-font">{film.title}</ProfileTitle>
                <Button
                    type="default"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate(-1)}
                    size="large"
                >
                    {t("common.back")}
                </Button>
            </ProfileHeader>

            <ProfileContent>
                <ProfileSection>
                    <SectionTitle>{t("film.film_info")}</SectionTitle>
                    <Descriptions bordered column={1} size="small" className="custom-descriptions">
                        <Descriptions.Item label={t("film.episode")}>
                            Episode {film.episode_id}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("film.director")}>
                            {film.director}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("film.producer")}>
                            {film.producer}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("film.release_date")}>
                            {new Date(film.release_date).toLocaleDateString()}
                        </Descriptions.Item>
                    </Descriptions>
                </ProfileSection>

                <ProfileSection>
                    <SectionTitle>{t("film.opening_crawl")}</SectionTitle>
                    <CrawlBox>
                        {film.opening_crawl}
                    </CrawlBox>
                </ProfileSection>

                <ResourceListWrapper>
                    {film.characters.length > 0 && (
                        <ProfileSection>
                            <SectionTitle className="star-wars-font">{t("film.characters")}</SectionTitle>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                <ResourceTagsWrapper>
                                    {characters.map((c) => (
                                        <Tag
                                            key={c.url}
                                            color="cyan"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleCharacterClick(c.url)}
                                        >
                                            {c.name}
                                        </Tag>
                                    ))}
                                </ResourceTagsWrapper>
                            )}
                        </ProfileSection>
                    )}

                    {film.planets.length > 0 && (
                        <ProfileSection>
                            <SectionTitle className="star-wars-font">{t("film.planets")}</SectionTitle>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                <ResourceTagsWrapper>
                                    {planets.map((p) => (
                                        <Tag
                                            key={p.url}
                                            color="orange"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleModalOpen("planet", p.url)}
                                        >
                                            {p.name}
                                        </Tag>
                                    ))}
                                </ResourceTagsWrapper>
                            )}
                        </ProfileSection>
                    )}

                    {film.species.length > 0 && (
                        <ProfileSection>
                            <SectionTitle className="star-wars-font">{t("modal.species")}</SectionTitle>
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
                                </ResourceTagsWrapper>
                            )}
                        </ProfileSection>
                    )}

                    {film.vehicles.length > 0 && (
                        <ProfileSection>
                            <SectionTitle className="star-wars-font">{t("modal.vehicles")}</SectionTitle>
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

                    {film.starships.length > 0 && (
                        <ProfileSection>
                            <SectionTitle className="star-wars-font">{t("modal.starships")}</SectionTitle>
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

            <SpeciesModal
                speciesId={selectedIds.species}
                open={modalsOpen.species}
                onClose={() => handleModalClose("species")}
            />
            <VehicleModal
                vehicleId={selectedIds.vehicle}
                open={modalsOpen.vehicle}
                onClose={() => handleModalClose("vehicle")}
                onViewVehicle={(id) => HandleViewResource("vehicle", id)}
            />
            <StarshipModal
                starshipId={selectedIds.starship}
                open={modalsOpen.starship}
                onClose={() => handleModalClose("starship")}
                onViewStarship={(id) => HandleViewResource("starship", id)}
            />
            <PlanetModal
                planetId={selectedIds.planet}
                open={modalsOpen.planet}
                onClose={() => handleModalClose("planet")}
                onViewPlanet={(id) => HandleViewResource("planet", id)}
            />
        </ProfileContainer>
    );
}
