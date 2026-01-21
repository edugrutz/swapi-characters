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

    const speciesDetails = species ? [
        {
            label: t("species.classification"),
            value: <Capitalized>{species.classification}</Capitalized>,
        },
        {
            label: t("species.designation"),
            value: <Capitalized>{species.designation}</Capitalized>,
        },
        { label: t("species.average_height"), value: `${species.average_height} cm` },
        { label: t("species.average_lifespan"), value: `${species.average_lifespan} years` },
        { label: t("species.language"), value: species.language },
        {
            label: t("species.skin_colors"),
            value: <Capitalized>{species.skin_colors}</Capitalized>,
        },
        {
            label: t("species.hair_colors"),
            value: <Capitalized>{species.hair_colors}</Capitalized>,
        },
        {
            label: t("species.eye_colors"),
            value: <Capitalized>{species.eye_colors}</Capitalized>,
        },
    ] : [];

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
                    {speciesDetails.map((item) => (
                        <Descriptions.Item key={item.label} label={item.label}>
                            {item.value}
                        </Descriptions.Item>
                    ))}
                </Descriptions>
            )}
        </Modal>
    );
}
