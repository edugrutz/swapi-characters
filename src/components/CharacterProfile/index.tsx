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
} from "../../styles/antd/components/profile";

export function CharacterProfile() {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [filmModalOpen, setFilmModalOpen] = useState(false);
    const [selectedFilmId, setSelectedFilmId] = useState<string | null>(null);

    const [speciesModalOpen, setSpeciesModalOpen] = useState(false);
    const [selectedSpeciesId, setSelectedSpeciesId] = useState<string | null>(null);

    const [vehicleModalOpen, setVehicleModalOpen] = useState(false);
    const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

    const [starshipModalOpen, setStarshipModalOpen] = useState(false);
    const [selectedStarshipId, setSelectedStarshipId] = useState<string | null>(null);

    const [planetModalOpen, setPlanetModalOpen] = useState(false);
    const [selectedPlanetId, setSelectedPlanetId] = useState<string | null>(null);

    const { data, isFetching, error } = useCharacters({ page: 1, search: name || "" });
    const character = data?.results?.[0];

    const { homeworld, isLoading: isLoadingHomeworld } = useHomeworld(character?.homeworld || null);
    const { films, species, vehicles, starships, isLoading: isLoadingDetails } =
        useCharacterDetails(character || null);

    const handleFilmClick = (url: string) => {
        const id = extractId(url);
        setSelectedFilmId(id);
        setFilmModalOpen(true);
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

    const handlePlanetClick = (url: string) => {
        const id = extractId(url);
        setSelectedPlanetId(id);
        setPlanetModalOpen(true);
    };

    const handleViewPlanet = (planetId: string) => {
        setPlanetModalOpen(false);
        navigate(`/planet/${planetId}`);
    };

    const handleViewFilm = (filmId: string) => {
        setFilmModalOpen(false);
        navigate(`/film/${filmId}`);
    };

    const handleViewVehicle = (vehicleId: string) => {
        setVehicleModalOpen(false);
        navigate(`/vehicle/${vehicleId}`);
    };

    const handleViewStarship = (starshipId: string) => {
        setStarshipModalOpen(false);
        navigate(`/starship/${starshipId}`);
    };

    if (isFetching) {
        return (
            <ProfileContainer>
                <div style={{ textAlign: "center", padding: "4rem" }}>
                    <Spin size="large" />
                </div>
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
                <Button
                    type="primary"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/")}
                    style={{ marginTop: "1rem" }}
                >
                    {t("profile.back")}
                </Button>
            </ProfileContainer>
        );
    }

    return (
        <ProfileContainer>
            <ProfileHeader>
                <ProfileTitle className="star-wars-font">{character.name}</ProfileTitle>
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
                            <span style={{ textTransform: "capitalize" }}>{character.gender}</span>
                        </Descriptions.Item>
                        <Descriptions.Item label={t("table.columns.hair_color")}>
                            <span style={{ textTransform: "capitalize" }}>{character.hair_color}</span>
                        </Descriptions.Item>
                        <Descriptions.Item label={t("table.columns.skin_color")}>
                            <span style={{ textTransform: "capitalize" }}>{character.skin_color}</span>
                        </Descriptions.Item>
                        <Descriptions.Item label={t("table.columns.eye_color")}>
                            <span style={{ textTransform: "capitalize" }}>{character.eye_color}</span>
                        </Descriptions.Item>
                        <Descriptions.Item label={t("modal.homeworld")}>
                            {isLoadingHomeworld ? (
                                <Spin size="small" />
                            ) : homeworld ? (
                                <Tag
                                    color="orange"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handlePlanetClick(character.homeworld)}
                                >
                                    {homeworld.name}
                                </Tag>
                            ) : "n/a"}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("modal.species")}>
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
                                    {species.length === 0 && "n/a"}
                                </div>
                            )}
                        </Descriptions.Item>
                    </Descriptions>
                </ProfileSection>

                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
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

                    {character.vehicles.length > 0 && (
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

                    {character.starships.length > 0 && (
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
                    {t("modal.created")}: {new Date(character.created).toLocaleDateString()}
                </p>
                <p>
                    {t("modal.edited")}: {new Date(character.edited).toLocaleDateString()}
                </p>
            </div>

            <FilmModal
                filmId={selectedFilmId}
                open={filmModalOpen}
                onClose={() => setFilmModalOpen(false)}
                onViewFilm={handleViewFilm}
            />
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
                onViewStarship={handleViewStarship}
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
