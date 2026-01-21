import { Modal, Descriptions, Spin, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCharacterDetails } from "../../hooks/useCharacterDetails";
import { useHomeworld } from "../../hooks/useHomeworld";
import type { CharacterModalProps } from "./types";

export function CharacterModal({
	character,
	open,
	onClose,
}: CharacterModalProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { species, isLoading } = useCharacterDetails(character);
	const { homeworld, isLoading: isLoadingHomeworld } = useHomeworld(character?.homeworld || null);

	const handleViewProfile = () => {
		if (character) {
			onClose();
			navigate(`/character/${encodeURIComponent(character.name)}`);
		}
	};

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
			footer={
				<Button
					type="primary"
					icon={<UserOutlined />}
					onClick={handleViewProfile}
					size="large"
				>
					{t("modal.view_profile")}
				</Button>
			}
			width={700}
			centered
		>
			<Descriptions bordered column={1} size="small" className="custom-descriptions">
				<Descriptions.Item label={t("table.columns.height")}>{character.height} cm</Descriptions.Item>
				<Descriptions.Item label={t("table.columns.mass")}>{character.mass} kg</Descriptions.Item>
				<Descriptions.Item label={t("table.columns.birth_year")}>{character.birth_year}</Descriptions.Item>
				<Descriptions.Item label={t("table.columns.gender")}>
					<span style={{ textTransform: "capitalize" }}>{character.gender}</span>
				</Descriptions.Item>
				<Descriptions.Item label={t("table.columns.hair_color")}>
					<span style={{ textTransform: "capitalize" }}>{character.hair_color}</span>
				</Descriptions.Item>
				<Descriptions.Item label={t("table.columns.skin_color")}>
					<span style={{ textTransform: "capitalize" }}>{character.skin_color}</span>
				</Descriptions.Item>
				<Descriptions.Item label={t("table.columns.eye_color")}>
					<span style={{ textTransform: "capitalize" }}>{character.eye_color}</span>
				</Descriptions.Item>
				<Descriptions.Item label={t("modal.homeworld")}>
					{isLoadingHomeworld ? <Spin size="small" /> : homeworld?.name || "n/a"}
				</Descriptions.Item>
				<Descriptions.Item label={t("modal.species")}>
					{isLoading ? <Spin size="small" /> : species.map(s => s.name).join(", ") || "n/a"}
				</Descriptions.Item>
			</Descriptions>

			<div style={{ marginTop: "20px", fontSize: "0.8rem", textAlign: "right", opacity: 0.6 }}>
				<p>{t("modal.created")}: {new Date(character.created).toLocaleDateString()}</p>
				<p>{t("modal.edited")}: {new Date(character.edited).toLocaleDateString()}</p>
			</div>
		</Modal>
	);
}