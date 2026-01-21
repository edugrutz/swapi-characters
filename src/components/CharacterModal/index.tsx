import { Modal, Descriptions, Spin, Button, Skeleton } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCharacterDetails } from "../../hooks/useCharacterDetails";
import { useHomeworld } from "../../hooks/useHomeworld";
import { useCharacterImage } from "../../hooks/useCharacterImage";
import type { CharacterModalProps } from "./types";
import { Capitalized, ModalTitle } from "../../styles/antd/components/profile";
import styled from "styled-components";

export function CharacterModal({
	character,
	open,
	onClose,
}: CharacterModalProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { species, isLoading } = useCharacterDetails(character);
	const { homeworld, isLoading: isLoadingHomeworld } = useHomeworld(character?.homeworld || null);
	const { imageUrl, isLoading: isLoadingImage } = useCharacterImage(character?.name);

	const handleViewProfile = () => {
		if (character) {
			onClose();
			navigate(`/character/${encodeURIComponent(character.name)}`);
		}
	};

	if (!character) return null;

	const details = [
		{ label: t("table.columns.height"), value: `${character.height} cm` },
		{ label: t("table.columns.mass"), value: `${character.mass} kg` },
		{ label: t("table.columns.birth_year"), value: character.birth_year },
		{
			label: t("table.columns.gender"),
			value: <Capitalized>{character.gender}</Capitalized>,
		},
		{
			label: t("table.columns.hair_color"),
			value: <Capitalized>{character.hair_color}</Capitalized>,
		},
		{
			label: t("table.columns.skin_color"),
			value: <Capitalized>{character.skin_color}</Capitalized>,
		},
		{
			label: t("table.columns.eye_color"),
			value: <Capitalized>{character.eye_color}</Capitalized>,
		},
		{
			label: t("modal.homeworld"),
			value: isLoadingHomeworld ? <Spin size="small" /> : homeworld?.name || "n/a",
		},
		{
			label: t("modal.species"),
			value: isLoading ? (
				<Spin size="small" />
			) : (
				species.map((s) => s.name).join(", ") || "n/a"
			),
		},
	];

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
			<ModalContent>
				<ModalImageContainer>
					{isLoadingImage ? (
						<Skeleton.Image active style={{ width: 200, height: 280 }} />
					) : imageUrl ? (
						<ModalImage src={imageUrl} alt={character.name} />
					) : (
						<ModalImagePlaceholder>
							<UserOutlined style={{ fontSize: 64 }} />
						</ModalImagePlaceholder>
					)}
				</ModalImageContainer>
				<ModalDetailsContainer>
					<Descriptions bordered column={1} size="small" className="custom-descriptions">
						{details.map((item) => (
							<Descriptions.Item key={item.label} label={item.label}>
								{item.value}
							</Descriptions.Item>
						))}
					</Descriptions>
				</ModalDetailsContainer>
			</ModalContent>
		</Modal>
	);
}

const ModalContent = styled.div`
	display: flex;
	gap: 24px;
	align-items: flex-start;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: center;
	}
`;

const ModalImageContainer = styled.div`
	flex-shrink: 0;
`;

const ModalDetailsContainer = styled.div`
	flex: 1;
	min-width: 0;
`;

const ModalImage = styled.img`
	width: 200px;
	height: 280px;
	border-radius: 8px;
	object-fit: cover;
	border: 3px solid ${({ theme }) =>
		theme.theme === "dark" ? "#ffe81f" : "#1890ff"};
`;

const ModalImagePlaceholder = styled.div`
	width: 200px;
	height: 280px;
	border-radius: 8px;
	border: 3px solid ${({ theme }) =>
		theme.theme === "dark" ? "#ffe81f" : "#1890ff"};
	background: ${({ theme }) =>
		theme.theme === "dark" ? "rgba(255, 232, 31, 0.1)" : "rgba(24, 144, 255, 0.1)"};
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${({ theme }) =>
		theme.theme === "dark" ? "#ffe81f" : "#1890ff"};
`;