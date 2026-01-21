import { Modal, Descriptions, Spin, Alert } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchSpeciesById } from "../../services/swapiDetails";
import type { SpeciesModalProps } from "./types";

export function SpeciesModal({ speciesId, open, onClose }: SpeciesModalProps) {
    const { t } = useTranslation();

    const { data: species, isLoading, error } = useQuery({
        queryKey: ["species", speciesId],
        queryFn: () => fetchSpeciesById(speciesId!),
        enabled: !!speciesId && open,
    });

    return (
        <Modal
            title={
                <span className="star-wars-font" style={{ fontSize: "1.5rem" }}>
                    {species?.name || t("species.loading")}
                </span>
            }
            open={open}
            onCancel={onClose}
            footer={null}
            width={700}
            centered
        >
            {isLoading && (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                    <Spin size="large" />
                </div>
            )}

            {error && (
                <Alert
                    message={t("error.loading")}
                    description={error.message}
                    type="error"
                    showIcon
                />
            )}

            {species && (
                <Descriptions bordered column={1} size="small" className="custom-descriptions">
                    <Descriptions.Item label={t("species.classification")}>
                        <span style={{ textTransform: "capitalize" }}>{species.classification}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={t("species.designation")}>
                        <span style={{ textTransform: "capitalize" }}>{species.designation}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={t("species.average_height")}>
                        {species.average_height} cm
                    </Descriptions.Item>
                    <Descriptions.Item label={t("species.average_lifespan")}>
                        {species.average_lifespan} years
                    </Descriptions.Item>
                    <Descriptions.Item label={t("species.language")}>
                        {species.language}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("species.skin_colors")}>
                        <span style={{ textTransform: "capitalize" }}>{species.skin_colors}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={t("species.hair_colors")}>
                        <span style={{ textTransform: "capitalize" }}>{species.hair_colors}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={t("species.eye_colors")}>
                        <span style={{ textTransform: "capitalize" }}>{species.eye_colors}</span>
                    </Descriptions.Item>
                </Descriptions>
            )}
        </Modal>
    );
}
