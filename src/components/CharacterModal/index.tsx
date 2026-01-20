import { Modal, Descriptions, Tag, Divider } from "antd";
import { useTranslation } from "react-i18next";
import type { CharacterModalProps } from "./types";

export function CharacterModal({
	character,
	open,
	onClose,
}: CharacterModalProps) {
	const { t } = useTranslation();
	if (!character) return null;

	return (
		<Modal
			title={
				<span className="star-wars-font" style={{ fontSize: "1.5rem" }}>
					{character.name}
				</span>
			}
			open={open}
			onCancel={onClose}
			footer={null}
			width={600}
			centered
		>
			<Descriptions bordered column={1} size="small" className="custom-descriptions">
				<Descriptions.Item label={t("table.columns.height")}>{character.height} cm</Descriptions.Item>
				<Descriptions.Item label={t("table.columns.mass")}>{character.mass} kg</Descriptions.Item>
				<Descriptions.Item label={t("table.columns.birth_year")}>{character.birth_year}</Descriptions.Item>
				<Descriptions.Item label={t("table.columns.gender")}>
					<span style={{ textTransform: "capitalize" }}>{character.gender}</span>
				</Descriptions.Item>
				<Descriptions.Item label={t("table.columns.hair_color") || "Hair Color"}>
					<span style={{ textTransform: "capitalize" }}>{character.hair_color}</span>
				</Descriptions.Item>
				<Descriptions.Item label={t("table.columns.skin_color") || "Skin Color"}>
					<span style={{ textTransform: "capitalize" }}>{character.skin_color}</span>
				</Descriptions.Item>
				<Descriptions.Item label={t("table.columns.eye_color") || "Eye Color"}>
					<span style={{ textTransform: "capitalize" }}>{character.eye_color}</span>
				</Descriptions.Item>
			</Descriptions>

			<Divider style={{ borderColor: "#FFE81F" }}>
				<span className="star-wars-font" style={{ fontSize: "0.9rem" }}>{t("modal.statistics")}</span>
			</Divider>

			<div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
				<Tag color="gold">{t("modal.films")}: {character.films.length}</Tag>
				<Tag color="blue">{t("modal.species")}: {character.species.length}</Tag>
				<Tag color="green">{t("modal.vehicles")}: {character.vehicles.length}</Tag>
				<Tag color="purple">{t("modal.starships")}: {character.starships.length}</Tag>
			</div>

			<div style={{ marginTop: "20px", fontSize: "0.8rem", textAlign: "right", opacity: 0.6 }}>
				<p>{t("modal.created")}: {new Date(character.created).toLocaleDateString()}</p>
				<p>{t("modal.edited")}: {new Date(character.edited).toLocaleDateString()}</p>
			</div>
		</Modal>
	);
}