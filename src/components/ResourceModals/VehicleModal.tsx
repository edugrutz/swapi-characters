import { Modal, Descriptions, Spin, Alert, Button } from "antd";
import { CarOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchVehicleById } from "../../services/swapiDetails";
import type { VehicleModalProps } from "./types";
import { ModalTitle, LoadingWrapper, Capitalized } from "../../styles/antd/components/profile";

export function VehicleModal({ vehicleId, open, onClose, onViewVehicle }: VehicleModalProps) {
    const { t } = useTranslation();

    const { data: vehicle, isLoading, error } = useQuery({
        queryKey: ["vehicle", vehicleId],
        queryFn: () => fetchVehicleById(vehicleId!),
        enabled: !!vehicleId && open,
    });

    const handleViewVehicle = () => {
        if (vehicleId && onViewVehicle) {
            onViewVehicle(vehicleId);
        }
    };

    const vehicleDetails = vehicle ? [
        { label: t("vehicle.model"), value: vehicle.model },
        { label: t("vehicle.manufacturer"), value: vehicle.manufacturer },
        {
            label: t("vehicle.vehicle_class"),
            value: <Capitalized>{vehicle.vehicle_class}</Capitalized>,
        },
        {
            label: t("vehicle.cost_in_credits"),
            value: vehicle.cost_in_credits === "unknown"
                ? t("common.unknown")
                : `${parseInt(vehicle.cost_in_credits).toLocaleString()} credits`,
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

    return (
        <Modal
            title={<ModalTitle>{vehicle?.name || t("vehicle.loading")}</ModalTitle>}
            open={open}
            onCancel={onClose}
            footer={
                onViewVehicle && vehicleId ? (
                    <Button
                        type="primary"
                        icon={<CarOutlined />}
                        onClick={handleViewVehicle}
                        size="large"
                    >
                        {t("vehicle.view_vehicle")}
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

            {vehicle && (
                <Descriptions bordered column={1} size="small" className="custom-descriptions">
                    {vehicleDetails.map((item) => (
                        <Descriptions.Item key={item.label} label={item.label}>
                            {item.value}
                        </Descriptions.Item>
                    ))}
                </Descriptions>
            )}
        </Modal>
    );
}
