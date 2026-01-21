import { useParams, useNavigate } from "react-router-dom";
import { Descriptions, Spin, Alert, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchStarshipById } from "../../services/swapiDetails";
import { useStarshipDetails } from "../../hooks/useStarshipDetails";
import { FilmModal } from "../ResourceModals";
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
    StyledTag,
} from "../../styles/antd/components/profile";

export function StarshipDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [filmModalOpen, setFilmModalOpen] = useState(false);
    const [selectedFilmId, setSelectedFilmId] = useState<string | null>(null);

    const { data: starship, isLoading, error } = useQuery({
        queryKey: ["starship", id],
        queryFn: () => fetchStarshipById(id!),
        enabled: !!id,
    });

    const { pilots, films, isLoading: isLoadingDetails } = useStarshipDetails(starship);

    const handlePilotClick = (url: string) => {
        const pilotName = pilots.find(p => p.url === url)?.name;
        if (pilotName) {
            navigate(`/character/${encodeURIComponent(pilotName)}`);
        }
    };

    const handleFilmClick = (url: string) => {
        const id = extractId(url);
        setSelectedFilmId(id);
        setFilmModalOpen(true);
    };

    const handleViewFilm = (filmId: string) => {
        setFilmModalOpen(false);
        navigate(`/film/${filmId}`);
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

    if (error || !starship) {
        return (
            <ProfileContainer>
                <Alert
                    message={t("error.loading")}
                    description={error?.message || t("error.starship_not_found")}
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
                <ProfileTitle>{starship.name}</ProfileTitle>
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
                    <SectionTitle>{t("starship.starship_info")}</SectionTitle>
                    <Descriptions bordered column={1} size="small" className="custom-descriptions">
                        <Descriptions.Item label={t("starship.model")}>
                            {starship.model}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("starship.manufacturer")}>
                            {starship.manufacturer}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("starship.starship_class")}>
                            {starship.starship_class}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("starship.cost_in_credits")}>
                            {starship.cost_in_credits === "unknown"
                                ? t("common.unknown")
                                : parseInt(starship.cost_in_credits).toLocaleString()}
                        </Descriptions.Item>
                    </Descriptions>
                </ProfileSection>

                <ProfileSection>
                    <SectionTitle>{t("starship.specifications")}</SectionTitle>
                    <Descriptions bordered column={1} size="small" className="custom-descriptions">
                        <Descriptions.Item label={t("starship.length")}>
                            {starship.length} m
                        </Descriptions.Item>
                        <Descriptions.Item label={t("starship.max_atmosphering_speed")}>
                            {starship.max_atmosphering_speed} km/h
                        </Descriptions.Item>
                        <Descriptions.Item label={t("starship.hyperdrive_rating")}>
                            {starship.hyperdrive_rating}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("starship.MGLT")}>
                            {starship.MGLT}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("starship.crew")}>
                            {starship.crew}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("starship.passengers")}>
                            {starship.passengers}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("starship.cargo_capacity")}>
                            {starship.cargo_capacity === "unknown"
                                ? t("common.unknown")
                                : parseInt(starship.cargo_capacity).toLocaleString()} kg
                        </Descriptions.Item>
                        <Descriptions.Item label={t("starship.consumables")}>
                            {starship.consumables}
                        </Descriptions.Item>
                    </Descriptions>
                </ProfileSection>

                <ResourceListWrapper>
                    {starship.pilots.length > 0 && (
                        <ProfileSection>
                            <SectionTitle>{t("starship.pilots")}</SectionTitle>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                <ResourceTagsWrapper>
                                    {pilots.map((p) => (
                                        <StyledTag
                                            key={p.url}
                                            color="cyan"
                                            onClick={() => handlePilotClick(p.url)}
                                        >
                                            {p.name}
                                        </StyledTag>
                                    ))}
                                </ResourceTagsWrapper>
                            )}
                        </ProfileSection>
                    )}

                    {starship.films.length > 0 && (
                        <ProfileSection>
                            <SectionTitle>{t("modal.films")}</SectionTitle>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                <ResourceTagsWrapper>
                                    {films.map((f) => (
                                        <StyledTag
                                            key={f.url}
                                            color="gold"
                                            onClick={() => handleFilmClick(f.url)}
                                        >
                                            {f.title}
                                        </StyledTag>
                                    ))}
                                </ResourceTagsWrapper>
                            )}
                        </ProfileSection>
                    )}
                </ResourceListWrapper>
            </ProfileContent>

            <FilmModal
                filmId={selectedFilmId}
                open={filmModalOpen}
                onClose={() => setFilmModalOpen(false)}
                onViewFilm={handleViewFilm}
            />
        </ProfileContainer>
    );
}
