import { useParams, useNavigate } from "react-router-dom";
import { Descriptions, Spin, Alert, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchPlanetById } from "../../services/swapiDetails";
import { usePlanetDetails } from "../../hooks/usePlanetDetails";
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
    Capitalized,
    ResourceTagsWrapper,
    StyledTabs,
    StyledTag,
} from "../../styles/antd/components/profile";

export function PlanetDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [filmModalOpen, setFilmModalOpen] = useState(false);
    const [selectedFilmId, setSelectedFilmId] = useState<string | null>(null);

    const { data: planet, isLoading, error } = useQuery({
        queryKey: ["planet", id],
        queryFn: () => fetchPlanetById(id!),
        enabled: !!id,
    });

    const { residents, films, isLoading: isLoadingDetails } = usePlanetDetails(planet);

    const planetDetails = planet ? [
        {
            label: t("planet.climate"),
            value: <Capitalized>{planet.climate}</Capitalized>,
        },
        {
            label: t("planet.terrain"),
            value: <Capitalized>{planet.terrain}</Capitalized>,
        },
        {
            label: t("planet.population"),
            value: planet.population === "unknown"
                ? t("common.unknown")
                : parseInt(planet.population).toLocaleString(),
        },
        { label: t("planet.diameter"), value: `${planet.diameter} km` },
        { label: t("planet.gravity"), value: planet.gravity },
        { label: t("planet.surface_water"), value: `${planet.surface_water}%` },
        { label: t("planet.rotation_period"), value: `${planet.rotation_period} hours` },
        { label: t("planet.orbital_period"), value: `${planet.orbital_period} days` },
    ] : [];

    const handleFilmClick = (url: string) => {
        const id = extractId(url);
        setSelectedFilmId(id);
        setFilmModalOpen(true);
    };

    const handleResidentClick = (url: string) => {
        const residentName = residents.find(r => r.url === url)?.name;
        if (residentName) {
            navigate(`/character/${encodeURIComponent(residentName)}`);
        }
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

    if (error || !planet) {
        return (
            <ProfileContainer>
                <Alert
                    message={t("error.loading")}
                    description={error?.message || t("error.planet_not_found")}
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
                <ProfileTitle>{planet.name}</ProfileTitle>
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
                    <SectionTitle>{t("planet.planetary_info")}</SectionTitle>
                    <Descriptions
                        bordered
                        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                        size="small"
                        className="custom-descriptions"
                    >
                        {planetDetails.map((item) => (
                            <Descriptions.Item key={item.label} label={item.label}>
                                {item.value}
                            </Descriptions.Item>
                        ))}
                    </Descriptions>
                </ProfileSection>

                <StyledTabs
                    defaultActiveKey="residents"
                    items={[
                        {
                            key: "residents",
                            label: t("planet.residents"),
                            children: (
                                <ProfileSection>
                                    {isLoadingDetails ? (
                                        <Spin size="small" />
                                    ) : (
                                        <ResourceTagsWrapper>
                                            {residents.map((r) => (
                                                <StyledTag
                                                    key={r.url}
                                                    color="cyan"
                                                    onClick={() => handleResidentClick(r.url)}
                                                >
                                                    {r.name}
                                                </StyledTag>
                                            ))}
                                            {residents.length === 0 && t("common.no_resources")}
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
