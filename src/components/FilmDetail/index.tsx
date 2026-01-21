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
} from "../../styles/antd/components/profile";

export function FilmDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [speciesModalOpen, setSpeciesModalOpen] = useState(false);
    const [selectedSpeciesId, setSelectedSpeciesId] = useState<string | null>(null);

    const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
    const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

    const [starshipModalOpen, setStarshipModalOpen] = useState(false);
    const [selectedStarshipId, setSelectedStarshipId] = useState<string | null>(null);

    const [planetModalOpen, setPlanetModalOpen] = useState(false);
    const [selectedPlanetId, setSelectedPlanetId] = useState<string | null>(null);

    const { data: film, isLoading, error } = useQuery({
        queryKey: ["film", id],
        queryFn: () => fetchFilmById(id!),
        enabled: !!id,
    });

    const { characters, planets, starships, vehicles, species, isLoading: isLoadingDetails } = useFilmDetails(film);

    const handleCharacterClick = (url: string) => {
        const characterName = characters.find(c => c.url === url)?.name;
        if (characterName) {
            navigate(`/character/${encodeURIComponent(characterName)}`);
        }
    };

    const handlePlanetClick = (url: string) => {
        const id = extractId(url);
        setSelectedPlanetId(id);
        setPlanetModalOpen(true);
    };

    const handleViewPlanet = (planetId: string) => {
        setPlanetModalOpen(false);
        navigate(`/planet/${planetId}`);
    };

    const handleSpeciesClick = (url: string) => {
        const id = extractId(url);
        setSelectedSpeciesId(id);
        setSpeciesModalOpen(true);
    };

    const handleVehicleClick = (url: string) => {
        const id = extractId(url);
        setSelectedVehicleId(id);
        setVehicleModalOpen(true);
    };

    const handleStarshipClick = (url: string) => {
        const id = extractId(url);
        setSelectedStarshipId(id);
        setStarshipModalOpen(true);
    };

    const handleViewVehicle = (vehicleId: string) => {
        setVehicleModalOpen(false);
        navigate(`/vehicle/${vehicleId}`);
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

    if (error || !film) {
        return (
            <ProfileContainer>
                <Alert
                    message={t("error.loading")}
                    description={error?.message || t("error.film_not_found")}
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
                    <div
                        style={{
                            padding: "1rem",
                            background: "rgba(255, 232, 31, 0.05)",
                            border: "1px solid rgba(255, 232, 31, 0.2)",
                            borderRadius: "8px",
                            maxHeight: "300px",
                            overflowY: "auto",
                            fontStyle: "italic",
                            lineHeight: "1.6",
                        }}
                    >
                        {film.opening_crawl}
                    </div>
                </ProfileSection>

                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    {film.characters.length > 0 && (
                        <ProfileSection>
                            <SectionTitle className="star-wars-font">{t("film.characters")}</SectionTitle>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
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
                                </div>
                            )}
                        </ProfileSection>
                    )}

                    {film.planets.length > 0 && (
                        <ProfileSection>
                            <SectionTitle className="star-wars-font">{t("film.planets")}</SectionTitle>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    {planets.map((p) => (
                                        <Tag
                                            key={p.url}
                                            color="orange"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handlePlanetClick(p.url)}
                                        >
                                            {p.name}
                                        </Tag>
                                    ))}
                                </div>
                            )}
                        </ProfileSection>
                    )}

                    {film.species.length > 0 && (
                        <ProfileSection>
                            <SectionTitle className="star-wars-font">{t("modal.species")}</SectionTitle>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    {species.map((s) => (
                                        <Tag
                                            key={s.url}
                                            color="blue"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleSpeciesClick(s.url)}
                                        >
                                            {s.name}
                                        </Tag>
                                    ))}
                                </div>
                            )}
                        </ProfileSection>
                    )}

                    {film.vehicles.length > 0 && (
                        <ProfileSection>
                            <SectionTitle className="star-wars-font">{t("modal.vehicles")}</SectionTitle>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    {vehicles.map((v) => (
                                        <Tag
                                            key={v.url}
                                            color="green"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleVehicleClick(v.url)}
                                        >
                                            {v.name}
                                        </Tag>
                                    ))}
                                </div>
                            )}
                        </ProfileSection>
                    )}

                    {film.starships.length > 0 && (
                        <ProfileSection>
                            <SectionTitle className="star-wars-font">{t("modal.starships")}</SectionTitle>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    {starships.map((s) => (
                                        <Tag
                                            key={s.url}
                                            color="purple"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleStarshipClick(s.url)}
                                        >
                                            {s.name}
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
                    {t("modal.created")}: {new Date(film.created).toLocaleDateString()}
                </p>
                <p>
                    {t("modal.edited")}: {new Date(film.edited).toLocaleDateString()}
                </p>
            </div>

            <SpeciesModal
                speciesId={selectedSpeciesId}
                open={speciesModalOpen}
                onClose={() => setSpeciesModalOpen(false)}
            />
            <VehicleModal
                vehicleId={selectedVehicleId}
                open={vehicleModalOpen}
                onClose={() => setVehicleModalOpen(false)}
                onViewVehicle={handleViewVehicle}
            />
            <StarshipModal
                starshipId={selectedStarshipId}
                open={starshipModalOpen}
                onClose={() => setStarshipModalOpen(false)}
            />
            <PlanetModal
                planetId={selectedPlanetId}
                open={planetModalOpen}
                onClose={() => setPlanetModalOpen(false)}
                onViewPlanet={handleViewPlanet}
            />
        </ProfileContainer>
    );
}
