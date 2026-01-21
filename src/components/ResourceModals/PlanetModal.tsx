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
        { label: t("planet.rotation_period"), value: `${planet.rotation_period} hours` },
        { label: t("planet.orbital_period"), value: `${planet.orbital_period} days` },
        { label: t("planet.surface_water"), value: `${planet.surface_water}%` },
    ] : [];

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
                    {planetDetails.map((item) => (
                        <Descriptions.Item key={item.label} label={item.label}>
                            {item.value}
                        </Descriptions.Item>
                    ))}
                </Descriptions>
            )}
        </Modal>
    );
}
