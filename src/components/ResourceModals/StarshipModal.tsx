import { Modal, Descriptions, Spin, Alert, Button } from "antd";
import { RocketOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchStarshipById } from "../../services/swapiDetails";
import type { StarshipModalProps } from "./types";
import { ModalTitle, LoadingWrapper, Capitalized } from "../../styles/antd/components/profile";

export function StarshipModal({ starshipId, open, onClose, onViewStarship }: StarshipModalProps) {
    const { t } = useTranslation();

    const { data: starship, isLoading, error } = useQuery({
        queryKey: ["starship", starshipId],
        queryFn: () => fetchStarshipById(starshipId!),
        enabled: !!starshipId && open,
    });

    const handleViewStarship = () => {
        if (starshipId && onViewStarship) {
            onViewStarship(starshipId);
        }
    };

    return (
        <Modal
            title={<ModalTitle>{starship?.name || t("starship.loading")}</ModalTitle>}
            open={open}
            onCancel={onClose}
            footer={
                onViewStarship && starshipId ? (
                    <Button
                        type="primary"
                        icon={<RocketOutlined />}
                        onClick={handleViewStarship}
                        size="large"
                    >
                        {t("starship.view_starship")}
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

            {starship && (
                <Descriptions bordered column={1} size="small" className="custom-descriptions">
                    <Descriptions.Item label={t("starship.model")}>
                        {starship.model}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("starship.manufacturer")}>
                        {starship.manufacturer}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("starship.starship_class")}>
                        <Capitalized>{starship.starship_class}</Capitalized>
                    </Descriptions.Item>
                    <Descriptions.Item label={t("starship.cost_in_credits")}>
                        {starship.cost_in_credits === "unknown"
                            ? t("common.unknown")
                            : `${parseInt(starship.cost_in_credits).toLocaleString()} credits`}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("starship.length")}>
                        {starship.length} m
                    </Descriptions.Item>
                    <Descriptions.Item label={t("starship.max_atmosphering_speed")}>
                        {starship.max_atmosphering_speed} km/h
                    </Descriptions.Item>
                    <Descriptions.Item label={t("starship.hyperdrive_rating")}>
                        {starship.hyperdrive_rating}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("starship.MGLT")}>
                        {starship.MGLT}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("starship.crew")}>
                        {starship.crew}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("starship.passengers")}>
                        {starship.passengers}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("starship.cargo_capacity")}>
                        {starship.cargo_capacity === "unknown"
                            ? t("common.unknown")
                            : `${parseInt(starship.cargo_capacity).toLocaleString()} kg`}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("starship.consumables")}>
                        {starship.consumables}
                    </Descriptions.Item>
                </Descriptions>
            )}
        </Modal>
    );
}
