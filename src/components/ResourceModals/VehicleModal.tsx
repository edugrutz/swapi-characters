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
                    <Descriptions.Item label={t("vehicle.model")}>
                        {vehicle.model}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("vehicle.manufacturer")}>
                        {vehicle.manufacturer}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("vehicle.vehicle_class")}>
                        <Capitalized>{vehicle.vehicle_class}</Capitalized>
                    </Descriptions.Item>
                    <Descriptions.Item label={t("vehicle.cost_in_credits")}>
                        {vehicle.cost_in_credits === "unknown"
                            ? t("common.unknown")
                            : `${parseInt(vehicle.cost_in_credits).toLocaleString()} credits`}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("vehicle.length")}>
                        {vehicle.length} m
                    </Descriptions.Item>
                    <Descriptions.Item label={t("vehicle.max_atmosphering_speed")}>
                        {vehicle.max_atmosphering_speed} km/h
                    </Descriptions.Item>
                    <Descriptions.Item label={t("vehicle.crew")}>
                        {vehicle.crew}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("vehicle.passengers")}>
                        {vehicle.passengers}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("vehicle.cargo_capacity")}>
                        {vehicle.cargo_capacity === "unknown"
                            ? t("common.unknown")
                            : `${parseInt(vehicle.cargo_capacity).toLocaleString()} kg`}
                    </Descriptions.Item>
                    <Descriptions.Item label={t("vehicle.consumables")}>
                        {vehicle.consumables}
                    </Descriptions.Item>
                </Descriptions>
            )}
        </Modal>
    );
}
