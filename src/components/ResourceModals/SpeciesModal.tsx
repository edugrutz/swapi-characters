import { Modal, Descriptions, Spin, Alert } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchSpeciesById } from "../../services/swapiDetails";
import type { SpeciesModalProps } from "./types";
import { ModalTitle, LoadingWrapper, Capitalized } from "../../styles/antd/components/profile";

export function SpeciesModal({ speciesId, open, onClose }: SpeciesModalProps) {
    const { t } = useTranslation();

    const { data: species, isLoading, error } = useQuery({
        queryKey: ["species", speciesId],
        queryFn: () => fetchSpeciesById(speciesId!),
        enabled: !!speciesId && open,
    });

    return (
        <Modal
            title={<ModalTitle>{species?.name || t("species.loading")}</ModalTitle>}
            open={open}
            onCancel={onClose}
            footer={null}
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

            {species && (
                <Descriptions bordered column={1} size="small" className="custom-descriptions">
                    <Descriptions.Item label={t("species.classification")}>
                        <Capitalized>{species.classification}</Capitalized>
                    </Descriptions.Item>
                    <Descriptions.Item label={t("species.designation")}>
                        <Capitalized>{species.designation}</Capitalized>
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
                        <Capitalized>{species.skin_colors}</Capitalized>
                    </Descriptions.Item>
                    <Descriptions.Item label={t("species.hair_colors")}>
                        <Capitalized>{species.hair_colors}</Capitalized>
                    </Descriptions.Item>
                    <Descriptions.Item label={t("species.eye_colors")}>
                        <Capitalized>{species.eye_colors}</Capitalized>
                    </Descriptions.Item>
                </Descriptions>
            )}
        </Modal>
    );
}
