import { Modal, Descriptions, Spin, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCharacterDetails } from "../../hooks/useCharacterDetails";
import { useHomeworld } from "../../hooks/useHomeworld";
import type { CharacterModalProps } from "./types";
import { Capitalized, ModalTitle } from "../../styles/antd/components/profile";

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
			title={<ModalTitle>{character.name}</ModalTitle>}
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
					<Capitalized>{character.gender}</Capitalized>
				</Descriptions.Item>
				<Descriptions.Item label={t("table.columns.hair_color")}>
					<Capitalized>{character.hair_color}</Capitalized>
				</Descriptions.Item>
				<Descriptions.Item label={t("table.columns.skin_color")}>
					<Capitalized>{character.skin_color}</Capitalized>
				</Descriptions.Item>
				<Descriptions.Item label={t("table.columns.eye_color")}>
					<Capitalized>{character.eye_color}</Capitalized>
				</Descriptions.Item>
				<Descriptions.Item label={t("modal.homeworld")}>
					{isLoadingHomeworld ? <Spin size="small" /> : homeworld?.name || "n/a"}
				</Descriptions.Item>
				<Descriptions.Item label={t("modal.species")}>
					{isLoading ? <Spin size="small" /> : species.map(s => s.name).join(", ") || "n/a"}
				</Descriptions.Item>
			</Descriptions>
		</Modal>
	);
}