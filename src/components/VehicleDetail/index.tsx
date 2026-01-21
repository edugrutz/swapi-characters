import { useParams, useNavigate } from "react-router-dom";
import { Descriptions, Spin, Alert, Button } from "antd";
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
    StyledTabs,
    StyledTag,
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

    const vehicleDetails = vehicle ? [
        { label: t("vehicle.model"), value: vehicle.model },
        { label: t("vehicle.manufacturer"), value: vehicle.manufacturer },
        { label: t("vehicle.vehicle_class"), value: vehicle.vehicle_class },
        {
            label: t("vehicle.cost_in_credits"),
            value: vehicle.cost_in_credits === "unknown"
                ? t("common.unknown")
                : parseInt(vehicle.cost_in_credits).toLocaleString(),
        },
        { label: t("vehicle.length"), value: `${vehicle.length} m` },
        {
            label: t("vehicle.max_atmosphering_speed"),
            value: `${vehicle.max_atmosphering_speed} km/h`,
        },
        { label: t("vehicle.crew"), value: vehicle.crew },
        { label: t("vehicle.passengers"), value: vehicle.passengers },
        {
            label: t("vehicle.cargo_capacity"),
            value: vehicle.cargo_capacity === "unknown"
                ? t("common.unknown")
                : `${parseInt(vehicle.cargo_capacity).toLocaleString()} kg`,
        },
        { label: t("vehicle.consumables"), value: vehicle.consumables },
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
                <ProfileTitle>{vehicle.name}</ProfileTitle>
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
                    <Descriptions
                        bordered
                        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                        size="small"
                        className="custom-descriptions"
                    >
                        {vehicleDetails.map((item) => (
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
                            label: t("vehicle.pilots"),
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
