import { Modal, Descriptions, Spin, Alert, Button } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchPlanetById } from "../../services/swapiDetails";
import type { PlanetModalProps } from "./types";
import { ModalTitle, LoadingWrapper, Capitalized } from "../../styles/antd/components/profile";

export function PlanetModal({ planetId, open, onClose, onViewPlanet }: PlanetModalProps) {
    const { t } = useTranslation();

    const { data: planet, isLoading, error } = useQuery({
        queryKey: ["planet", planetId],
        queryFn: () => fetchPlanetById(planetId!),
        enabled: !!planetId && open,
    });

    const handleViewPlanet = () => {
        if (planetId && onViewPlanet) {
            onViewPlanet(planetId);
        }
    };

    return (
        <Modal
            title={<ModalTitle>{planet?.name || t("planet.loading")}</ModalTitle>}
            open={open}
            onCancel={onClose}
            footer={
                onViewPlanet && planetId ? (
                    <Button
                        type="primary"
                        icon={<GlobalOutlined />}
                        onClick={handleViewPlanet}
                        size="large"
                    >
                        {t("planet.view_planet")}
                    </Button>
                ) : null
            }
            width={700}
            centered
        >
            {isLoading && (
                <LoadingWrapper>
                    <Spin size="large" />
                </LoadingWrapper>
            )}

            {error && (
                <Alert
                    message={t("error.loading")}
                    description={error.message}
                    type="error"
                    showIcon
                />
            )}

            {planet && (
                <Descriptions bordered column={1} size="small" className="custom-descriptions">
                    <Descriptions.Item label={t("planet.climate")}>
                        <Capitalized>{planet.climate}</Capitalized>
                    </Descriptions.Item>
                    <Descriptions.Item label={t("planet.terrain")}>
                        <Capitalized>{planet.terrain}</Capitalized>
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
                    <Descriptions.Item label={t("planet.rotation_period")}>
                        {planet.rotation_period} hours
                    </Descriptions.Item>
                    <Descriptions.Item label={t("planet.orbital_period")}>
                        {planet.orbital_period} days
                    </Descriptions.Item>
                    <Descriptions.Item label={t("planet.surface_water")}>
                        {planet.surface_water}%
                    </Descriptions.Item>
                </Descriptions>
            )}
        </Modal>
    );
}
