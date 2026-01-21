import { useParams, useNavigate } from "react-router-dom";
import { Descriptions, Spin, Alert, Button, Tag } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchVehicleById } from "../../services/swapiDetails";
import { useVehicleDetails } from "../../hooks/useVehicleDetails";
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
} from "../../styles/antd/components/profile";

export function VehicleDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [filmModalOpen, setFilmModalOpen] = useState(false);
    const [selectedFilmId, setSelectedFilmId] = useState<string | null>(null);

    const { data: vehicle, isLoading, error } = useQuery({
        queryKey: ["vehicle", id],
        queryFn: () => fetchVehicleById(id!),
        enabled: !!id,
    });

    const { pilots, films, isLoading: isLoadingDetails } = useVehicleDetails(vehicle);

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

    if (error || !vehicle) {
        return (
            <ProfileContainer>
                <Alert
                    message={t("error.loading")}
                    description={error?.message || t("error.vehicle_not_found")}
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
                <ProfileTitle className="star-wars-font">{vehicle.name}</ProfileTitle>
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
                    <SectionTitle>{t("vehicle.vehicle_info")}</SectionTitle>
                    <Descriptions bordered column={1} size="small" className="custom-descriptions">
                        <Descriptions.Item label={t("vehicle.model")}>
                            {vehicle.model}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("vehicle.manufacturer")}>
                            {vehicle.manufacturer}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("vehicle.vehicle_class")}>
                            {vehicle.vehicle_class}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("vehicle.cost_in_credits")}>
                            {vehicle.cost_in_credits === "unknown"
                                ? t("common.unknown")
                                : parseInt(vehicle.cost_in_credits).toLocaleString()}
                        </Descriptions.Item>
                    </Descriptions>
                </ProfileSection>

                <ProfileSection>
                    <SectionTitle>{t("vehicle.specifications")}</SectionTitle>
                    <Descriptions bordered column={1} size="small" className="custom-descriptions">
                        <Descriptions.Item label={t("vehicle.length")}>
                            {vehicle.length} m
                        </Descriptions.Item>
                        <Descriptions.Item label={t("vehicle.max_atmosphering_speed")}>
                            {vehicle.max_atmosphering_speed} km/h
                        </Descriptions.Item>
                        <Descriptions.Item label={t("vehicle.crew")}>
                            {vehicle.crew}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("vehicle.passengers")}>
                            {vehicle.passengers}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("vehicle.cargo_capacity")}>
                            {vehicle.cargo_capacity === "unknown"
                                ? t("common.unknown")
                                : parseInt(vehicle.cargo_capacity).toLocaleString()} kg
                        </Descriptions.Item>
                        <Descriptions.Item label={t("vehicle.consumables")}>
                            {vehicle.consumables}
                        </Descriptions.Item>
                    </Descriptions>
                </ProfileSection>

                <ResourceListWrapper>
                    {vehicle.pilots.length > 0 && (
                        <ProfileSection>
                            <SectionTitle className="star-wars-font">{t("vehicle.pilots")}</SectionTitle>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                <ResourceTagsWrapper>
                                    {pilots.map((p) => (
                                        <Tag
                                            key={p.url}
                                            color="cyan"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handlePilotClick(p.url)}
                                        >
                                            {p.name}
                                        </Tag>
                                    ))}
                                </ResourceTagsWrapper>
                            )}
                        </ProfileSection>
                    )}

                    {vehicle.films.length > 0 && (
                        <ProfileSection>
                            <SectionTitle className="star-wars-font">{t("modal.films")}</SectionTitle>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                <ResourceTagsWrapper>
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
