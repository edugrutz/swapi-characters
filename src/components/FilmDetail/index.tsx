import { useParams, useNavigate } from "react-router-dom";
import { Descriptions, Spin, Alert, Button } from "antd";
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
    CrawlBox,
    StyledTag,
    StyledTabs,
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

    const filmDetails = film ? [
        { label: t("film.episode"), value: `Episode ${film.episode_id}` },
        { label: t("film.director"), value: film.director },
        { label: t("film.producer"), value: film.producer },
        {
            label: t("film.release_date"),
            value: new Date(film.release_date).toLocaleDateString(),
        },
    ] : [];

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
                <ProfileTitle>{film.title}</ProfileTitle>
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
                    <Descriptions
                        bordered
                        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                        size="small"
                        className="custom-descriptions"
                    >
                        {filmDetails.map((item) => (
                            <Descriptions.Item key={item.label} label={item.label}>
                                {item.value}
                            </Descriptions.Item>
                        ))}
                    </Descriptions>
                </ProfileSection>

                <ProfileSection>
                    <SectionTitle>{t("film.opening_crawl")}</SectionTitle>
                    <CrawlBox>
                        {film.opening_crawl}
                    </CrawlBox>
                </ProfileSection>

                <StyledTabs
                    defaultActiveKey="characters"
                    items={[
                        {
                            key: "characters",
                            label: t("film.characters"),
                            children: (
                                <ProfileSection>
                                    {isLoadingDetails ? (
                                        <Spin size="small" />
                                    ) : (
                                        <ResourceTagsWrapper>
                                            {characters.map((c) => (
                                                <StyledTag
                                                    key={c.url}
                                                    color="cyan"
                                                    onClick={() => handleCharacterClick(c.url)}
                                                >
                                                    {c.name}
                                                </StyledTag>
                                            ))}
                                            {characters.length === 0 && t("common.no_resources")}
                                        </ResourceTagsWrapper>
                                    )}
                                </ProfileSection>
                            ),
                        },
                        {
                            key: "planets",
                            label: t("film.planets"),
                            children: (
                                <ProfileSection>
                                    {isLoadingDetails ? (
                                        <Spin size="small" />
                                    ) : (
                                        <ResourceTagsWrapper>
                                            {planets.map((p) => (
                                                <StyledTag
                                                    key={p.url}
                                                    color="orange"
                                                    onClick={() => handleModalOpen("planet", p.url)}
                                                >
                                                    {p.name}
                                                </StyledTag>
                                            ))}
                                            {planets.length === 0 && t("common.no_resources")}
                                        </ResourceTagsWrapper>
                                    )}
                                </ProfileSection>
                            ),
                        },
                        {
                            key: "species",
                            label: t("modal.species"),
                            children: (
                                <ProfileSection>
                                    {isLoadingDetails ? (
                                        <Spin size="small" />
                                    ) : (
                                        <ResourceTagsWrapper>
                                            {species.map((s) => (
                                                <StyledTag
                                                    key={s.url}
                                                    color="blue"
                                                    onClick={() => handleModalOpen("species", s.url)}
                                                >
                                                    {s.name}
                                                </StyledTag>
                                            ))}
                                            {species.length === 0 && t("common.no_resources")}
                                        </ResourceTagsWrapper>
                                    )}
                                </ProfileSection>
                            ),
                        },
                        {
                            key: "vehicles",
                            label: t("modal.vehicles"),
                            children: (
                                <ProfileSection>
                                    {isLoadingDetails ? (
                                        <Spin size="small" />
                                    ) : (
                                        <ResourceTagsWrapper>
                                            {vehicles.map((v) => (
                                                <StyledTag
                                                    key={v.url}
                                                    color="green"
                                                    onClick={() => handleModalOpen("vehicle", v.url)}
                                                >
                                                    {v.name}
                                                </StyledTag>
                                            ))}
                                            {vehicles.length === 0 && t("common.no_resources")}
                                        </ResourceTagsWrapper>
                                    )}
                                </ProfileSection>
                            ),
                        },
                        {
                            key: "starships",
                            label: t("modal.starships"),
                            children: (
                                <ProfileSection>
                                    {isLoadingDetails ? (
                                        <Spin size="small" />
                                    ) : (
                                        <ResourceTagsWrapper>
                                            {starships.map((s) => (
                                                <StyledTag
                                                    key={s.url}
                                                    color="purple"
                                                    onClick={() => handleModalOpen("starship", s.url)}
                                                >
                                                    {s.name}
                                                </StyledTag>
                                            ))}
                                            {starships.length === 0 && t("common.no_resources")}
                                        </ResourceTagsWrapper>
                                    )}
                                </ProfileSection>
                            ),
                        },
                    ]}
                />
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
