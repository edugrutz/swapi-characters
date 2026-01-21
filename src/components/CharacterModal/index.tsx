import { Modal, Descriptions, Tag, Divider, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useCharacterDetails } from "../../hooks/useCharacterDetails";
import { useTheme } from "../../contexts/ThemeContext";
import type { CharacterModalProps } from "./types";

export function CharacterModal({
	character,
	open,
	onClose,
}: CharacterModalProps) {
	const { t } = useTranslation();
	const { theme } = useTheme();
	const { films, species, vehicles, starships, isLoading } = useCharacterDetails(character);

	const headingColor = theme === "dark" ? "#ffffffff" : "#202020ff";

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
				<Descriptions.Item label={t("table.columns.hair_color") || "Hair Color"}>
					<span style={{ textTransform: "capitalize" }}>{character.hair_color}</span>
				</Descriptions.Item>
				<Descriptions.Item label={t("table.columns.skin_color") || "Skin Color"}>
					<span style={{ textTransform: "capitalize" }}>{character.skin_color}</span>
				</Descriptions.Item>
				<Descriptions.Item label={t("table.columns.eye_color") || "Eye Color"}>
					<span style={{ textTransform: "capitalize" }}>{character.eye_color}</span>
				</Descriptions.Item>
				<Descriptions.Item label={t("modal.species")}>
					{isLoading ? <Spin size="small" /> : species.map(s => s.name).join(", ") || "n/a"}
				</Descriptions.Item>
			</Descriptions>

			<Divider style={{ borderColor: "#FFE81F" }}>
				<span className="star-wars-font" style={{ fontSize: "0.9rem" }}>{t("modal.statistics")}</span>
			</Divider>

			<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
				<section>
					<h4 style={{ color: headingColor, marginBottom: "8px" }}>{t("modal.films")}</h4>
					{isLoading ? <Spin size="small" /> : (
						<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
							{films.map(f => <Tag key={f.url} color="gold">{f.title}</Tag>)}
						</div>
					)}
				</section>

				{character.vehicles.length > 0 && (
					<section>
						<h4 style={{ color: headingColor, marginBottom: "8px" }}>{t("modal.vehicles")}</h4>
						{isLoading ? <Spin size="small" /> : (
							<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
								{vehicles.map(v => <Tag key={v.url} color="green">{v.name}</Tag>)}
							</div>
						)}
					</section>
				)}

				{character.starships.length > 0 && (
					<section>
						<h4 style={{ color: headingColor, marginBottom: "8px" }}>{t("modal.starships")}</h4>
						{isLoading ? <Spin size="small" /> : (
							<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
								{starships.map(s => <Tag key={s.url} color="purple">{s.name}</Tag>)}
							</div>
						)}
					</section>
				)}
			</div>

			<div style={{ marginTop: "20px", fontSize: "0.8rem", textAlign: "right", opacity: 0.6 }}>
				<p>{t("modal.created")}: {new Date(character.created).toLocaleDateString()}</p>
				<p>{t("modal.edited")}: {new Date(character.edited).toLocaleDateString()}</p>
			</div>
		</Modal>
	);
}