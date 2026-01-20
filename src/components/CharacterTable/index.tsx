import { Table, Input, Alert } from "antd";
import {
	ManOutlined,
	WomanOutlined,
	QuestionOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useCharacters } from "../../hooks/useCharacters";
import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { CharacterModal } from "../CharacterModal";
import type { Character } from "../../types/character";

export function CharacterTable() {
	const { t } = useTranslation();
	const [page, setPage] = useState(1);
	const [searchValue, setSearchValue] = useState("");
	const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
		null,
	);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const debouncedSearch = useDebounce(searchValue, 500);
	const { data, isFetching, error } = useCharacters({ page, search: debouncedSearch });

	useEffect(() => {
		setPage(1);
	}, [debouncedSearch]);

	const handleSearch = (value: string) => {
		setSearchValue(value);
	};

	const handleRowClick = (record: Character) => {
		setSelectedCharacter(record);
		setIsModalOpen(true);
	};

	const columns = [
		{
			title: t("table.columns.name"),
			dataIndex: "name",
			key: "name",
			width: 200,
		},
		{
			title: t("table.columns.height"),
			dataIndex: "height",
			key: "height",
			width: 100,
		},
		{
			title: t("table.columns.mass"),
			dataIndex: "mass",
			key: "mass",
			width: 100,
		},
		{
			title: t("table.columns.birth_year"),
			dataIndex: "birth_year",
			key: "birth_year",
			width: 150,
		},
		{
			title: t("table.columns.gender"),
			dataIndex: "gender",
			key: "gender",
			width: 180,
			render: (gender: string) => {
				const getGenderIcon = () => {
					switch (gender.toLowerCase()) {
						case "male":
							return (
								<ManOutlined style={{ color: "#1890ff", marginRight: 8 }} />
							);
						case "female":
							return (
								<WomanOutlined style={{ color: "#eb2f96", marginRight: 8 }} />
							);
						default:
							return (
								<QuestionOutlined
									style={{ color: "#8c8c8c", marginRight: 8 }}
								/>
							);
					}
				};

				return (
					<span
						style={{
							textTransform: "capitalize",
							display: "inline-flex",
							alignItems: "center",
						}}
					>
						{getGenderIcon()}
						{gender}
					</span>
				);
			},
		},
	];

	return (
		<div>
			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					marginBottom: 10,
				}}
			>
				<Input
					placeholder={t("table.search_placeholder")}
					allowClear
					value={searchValue}
					onChange={(e) => handleSearch(e.target.value)}
					style={{ maxWidth: 400 }}
				/>
			</div>
			{error && (
				<Alert
					message={t("error.loading")}
					description={
						error.message || t("error.swapi")
					}
					type="error"
					showIcon
					closable
					style={{ marginBottom: 16 }}
				/>
			)}
			<Table
				columns={columns}
				dataSource={data?.results || []}
				loading={isFetching}
				rowKey="name"
				tableLayout="fixed"
				scroll={{ x: 730 }}
				onRow={(record) => ({
					onClick: () => handleRowClick(record),
					style: { cursor: "pointer" },
				})}
				pagination={{
					current: page,
					total: data?.count || 0,
					pageSize: 10,
					showSizeChanger: false,
					onChange: setPage,
				}}
			/>

			<CharacterModal
				character={selectedCharacter}
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</div>
	);
}

