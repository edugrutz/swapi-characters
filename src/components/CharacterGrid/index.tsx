import { List, Input, Alert } from "antd";
import { useTranslation } from "react-i18next";
import { useCharacters } from "../../hooks/useCharacters";
import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { CharacterModal } from "../CharacterModal";
import type { Character } from "../../types/character";
import { CharacterCard } from "../CharacterCard";
import * as S from "./style";

export function CharacterGrid() {
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

	const handleCardClick = (character: Character) => {
		setSelectedCharacter(character);
		setIsModalOpen(true);
	};

	const getGenderIcon = (gender: string) => {
		switch (gender.toLowerCase()) {
			case "male":
				return <S.MaleIcon />;
			case "female":
				return <S.FemaleIcon />;
			default:
				return <S.UnknownIcon />;
		}
	};

	return (
		<S.Container>
			<S.SearchGrid>
				<Input
					placeholder={t("table.search_placeholder")}
					allowClear
					value={searchValue}
					onChange={(e) => handleSearch(e.target.value)}
					style={{ maxWidth: 400 }}
					size="large"
				/>
			</S.SearchGrid>
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
			<List
				grid={{ gutter: 24, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 5 }}
				dataSource={data?.results || []}
				loading={isFetching}
				pagination={{
					current: page,
					total: data?.count || 0,
					pageSize: 10,
					showSizeChanger: false,
					onChange: setPage,
					align: 'center',
					style: { marginTop: 40 }
				}}
				renderItem={(character: Character) => (
					<List.Item>
						<CharacterCard character={character} onClick={() => handleCardClick(character)} getGenderIcon={getGenderIcon} />
					</List.Item>
				)}
			/>

			<CharacterModal
				character={selectedCharacter}
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</S.Container>
	);
}

