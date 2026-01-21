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
    StyledTag,
    StyledTabs,
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

    const starshipDetails = starship ? [
        { label: t("starship.model"), value: starship.model },
        { label: t("starship.manufacturer"), value: starship.manufacturer },
        { label: t("starship.starship_class"), value: starship.starship_class },
        {
            label: t("starship.cost_in_credits"),
            value: starship.cost_in_credits === "unknown"
                ? t("common.unknown")
                : parseInt(starship.cost_in_credits).toLocaleString(),
        },
        { label: t("starship.length"), value: `${starship.length} m` },
        {
            label: t("starship.max_atmosphering_speed"),
            value: `${starship.max_atmosphering_speed} km/h`,
        },
        { label: t("starship.hyperdrive_rating"), value: starship.hyperdrive_rating },
        { label: t("starship.MGLT"), value: starship.MGLT },
        { label: t("starship.crew"), value: starship.crew },
        { label: t("starship.passengers"), value: starship.passengers },
        {
            label: t("starship.cargo_capacity"),
            value: starship.cargo_capacity === "unknown"
                ? t("common.unknown")
                : `${parseInt(starship.cargo_capacity).toLocaleString()} kg`,
        },
        { label: t("starship.consumables"), value: starship.consumables },
    ] : [];

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
                    <Descriptions
                        bordered
                        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                        size="small"
                        className="custom-descriptions"
                    >
                        {starshipDetails.map((item) => (
                            <Descriptions.Item key={item.label} label={item.label}>
                                {item.value}
                            </Descriptions.Item>
                        ))}
                    </Descriptions>
                </ProfileSection>

                <StyledTabs
                    defaultActiveKey="pilots"
                    items={[
                        {
                            key: "pilots",
                            label: t("starship.pilots"),
                            children: (
                                <ProfileSection>
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
                                            {pilots.length === 0 && t("common.no_resources")}
                                        </ResourceTagsWrapper>
                                    )}
                                </ProfileSection>
                            ),
                        },
                        {
                            key: "films",
                            label: t("modal.films"),
                            children: (
                                <ProfileSection>
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
                                            {films.length === 0 && t("common.no_resources")}
                                        </ResourceTagsWrapper>
                                    )}
                                </ProfileSection>
                            ),
                        },
                    ]}
                />
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
