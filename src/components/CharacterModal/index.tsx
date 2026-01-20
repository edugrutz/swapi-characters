import { Modal, Descriptions, Tag, Divider } from "antd";
import type { CharacterModalProps } from "./types";

export function CharacterModal({
	character,
	open,
	onClose,
}: CharacterModalProps) {
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
				<Descriptions.Item label="Height">{character.height} cm</Descriptions.Item>
				<Descriptions.Item label="Mass">{character.mass} kg</Descriptions.Item>
				<Descriptions.Item label="Birth Year">{character.birth_year}</Descriptions.Item>
				<Descriptions.Item label="Gender">
					<span style={{ textTransform: "capitalize" }}>{character.gender}</span>
				</Descriptions.Item>
				<Descriptions.Item label="Hair Color">
					<span style={{ textTransform: "capitalize" }}>{character.hair_color}</span>
				</Descriptions.Item>
				<Descriptions.Item label="Skin Color">
					<span style={{ textTransform: "capitalize" }}>{character.skin_color}</span>
				</Descriptions.Item>
				<Descriptions.Item label="Eye Color">
					<span style={{ textTransform: "capitalize" }}>{character.eye_color}</span>
				</Descriptions.Item>
			</Descriptions>

			<Divider style={{ borderColor: "#FFE81F" }}>
				<span className="star-wars-font" style={{ fontSize: "0.9rem" }}>Statistics</span>
			</Divider>

			<div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
				<Tag color="gold">Films: {character.films.length}</Tag>
				<Tag color="blue">Species: {character.species.length}</Tag>
				<Tag color="green">Vehicles: {character.vehicles.length}</Tag>
				<Tag color="purple">Starships: {character.starships.length}</Tag>
			</div>

			<div style={{ marginTop: "20px", fontSize: "0.8rem", textAlign: "right", opacity: 0.6 }}>
				<p>Created: {new Date(character.created).toLocaleDateString()}</p>
				<p>Edited: {new Date(character.edited).toLocaleDateString()}</p>
			</div>
		</Modal>
	);
}