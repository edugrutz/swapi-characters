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

    const starshipDetails = starship ? [
        { label: t("starship.model"), value: starship.model },
        { label: t("starship.manufacturer"), value: starship.manufacturer },
        {
            label: t("starship.starship_class"),
            value: <Capitalized>{starship.starship_class}</Capitalized>,
        },
        {
            label: t("starship.cost_in_credits"),
            value: starship.cost_in_credits === "unknown"
                ? t("common.unknown")
                : `${parseInt(starship.cost_in_credits).toLocaleString()} credits`,
        },
        { label: t("starship.length"), value: `${starship.length} m` },
        {
            label: t("starship.max_atmosphering_speed"),
            value: `${starship.max_atmosphering_speed} km/h`,
        },
        { label: t("starship.hyperdrive_rating"), value: starship.hyperdrive_rating },
        { label: t("starship.MGLT"), value: starship.MGLT },
        { label: t("starship.crew"), value: starship.crew },
        { label: t("starship.passengers"), value: starship.passengers },
        {
            label: t("starship.cargo_capacity"),
            value: starship.cargo_capacity === "unknown"
                ? t("common.unknown")
                : `${parseInt(starship.cargo_capacity).toLocaleString()} kg`,
        },
        { label: t("starship.consumables"), value: starship.consumables },
    ] : [];

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
                    {starshipDetails.map((item) => (
                        <Descriptions.Item key={item.label} label={item.label}>
                            {item.value}
                        </Descriptions.Item>
                    ))}
                </Descriptions>
            )}
        </Modal>
    );
}
