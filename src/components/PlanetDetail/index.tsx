import { useParams, useNavigate } from "react-router-dom";
import { Descriptions, Spin, Alert, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchPlanetById } from "../../services/swapiDetails";
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

    const { data: planet, isLoading, error } = useQuery({
        queryKey: ["planet", id],
        queryFn: () => fetchPlanetById(id!),
        enabled: !!id,
    });

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
        </ProfileContainer>
    );
}
