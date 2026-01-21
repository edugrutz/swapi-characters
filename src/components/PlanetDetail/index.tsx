import { useParams, useNavigate } from "react-router-dom";
import { Descriptions, Spin, Alert, Button, Tag } from "antd";
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
                <div style={{ textAlign: "center", padding: "4rem" }}>
                    <Spin size="large" />
                </div>
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
                <Button
                    type="primary"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate(-1)}
                    style={{ marginTop: "1rem" }}
                >
                    {t("common.back")}
                </Button>
            </ProfileContainer>
        );
    }

    return (
        <ProfileContainer>
            <ProfileHeader>
                <ProfileTitle className="star-wars-font">{planet.name}</ProfileTitle>
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
                    <Descriptions bordered column={1} size="small" className="custom-descriptions">
                        <Descriptions.Item label={t("planet.climate")}>
                            <span style={{ textTransform: "capitalize" }}>{planet.climate}</span>
                        </Descriptions.Item>
                        <Descriptions.Item label={t("planet.terrain")}>
                            <span style={{ textTransform: "capitalize" }}>{planet.terrain}</span>
                        </Descriptions.Item>
                        <Descriptions.Item label={t("planet.population")}>
                            {planet.population === "unknown"
                                ? t("common.unknown")
                                : parseInt(planet.population).toLocaleString()}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("planet.diameter")}>
                            {planet.diameter} km
                        </Descriptions.Item>
                        <Descriptions.Item label={t("planet.gravity")}>
                            {planet.gravity}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("planet.surface_water")}>
                            {planet.surface_water}%
                        </Descriptions.Item>
                    </Descriptions>
                </ProfileSection>

                <ProfileSection>
                    <SectionTitle>{t("planet.orbital_info")}</SectionTitle>
                    <Descriptions bordered column={1} size="small" className="custom-descriptions">
                        <Descriptions.Item label={t("planet.rotation_period")}>
                            {planet.rotation_period} hours
                        </Descriptions.Item>
                        <Descriptions.Item label={t("planet.orbital_period")}>
                            {planet.orbital_period} days
                        </Descriptions.Item>
                    </Descriptions>
                </ProfileSection>

                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    {planet.residents.length > 0 && (
                        <ProfileSection>
                            <SectionTitle className="star-wars-font">{t("planet.residents")}</SectionTitle>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    {residents.map((r) => (
                                        <Tag
                                            key={r.url}
                                            color="cyan"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleResidentClick(r.url)}
                                        >
                                            {r.name}
                                        </Tag>
                                    ))}
                                </div>
                            )}
                        </ProfileSection>
                    )}

                    {planet.films.length > 0 && (
                        <ProfileSection>
                            <SectionTitle className="star-wars-font">{t("modal.films")}</SectionTitle>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    {films.map((f) => (
                                        <Tag
                                            key={f.url}
                                            color="gold"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleFilmClick(f.url)}
                                        >
                                            {f.title}
                                        </Tag>
                                    ))}
                                </div>
                            )}
                        </ProfileSection>
                    )}
                </div>
            </ProfileContent>

            <div
                style={{
                    marginTop: "2rem",
                    fontSize: "0.8rem",
                    textAlign: "right",
                    opacity: 0.6,
                }}
            >
                <p>
                    {t("modal.created")}: {new Date(planet.created).toLocaleDateString()}
                </p>
                <p>
                    {t("modal.edited")}: {new Date(planet.edited).toLocaleDateString()}
                </p>
            </div>

            <FilmModal
                filmId={selectedFilmId}
                open={filmModalOpen}
                onClose={() => setFilmModalOpen(false)}
                onViewFilm={handleViewFilm}
            />
        </ProfileContainer>
    );
}
