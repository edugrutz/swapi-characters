import { useTranslation } from "react-i18next";
import { UserOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import type { CharacterCardProps } from "./types";
import { Capitalized } from "../../styles/antd/components/profile";
import { useCharacterImage } from "../../hooks/useCharacterImage";
import * as S from "./style";

export function CharacterCard({ character, onClick, getGenderIcon }: CharacterCardProps) {
    const { t } = useTranslation();
    const { imageUrl, isLoading: isLoadingImage } = useCharacterImage(character.name);

    const fields = [
        { label: t("table.columns.height"), value: `${character.height} cm` },
        { label: t("table.columns.mass"), value: `${character.mass} kg` },
        { label: t("table.columns.birth_year"), value: character.birth_year },
        {
            label: t("table.columns.gender"),
            value: (
                <>
                    {getGenderIcon(character.gender)}
                    <Capitalized>{character.gender}</Capitalized>
                </>
            ),
        },
    ];

    return (
        <S.StyledCard
            title={character.name}
            onClick={() => onClick(character)}
            hoverable
        >
            <S.CardContent>
                <S.CardInfo>
                    {fields.map((field) => (
                        <div key={field.label}>
                            <S.CardLabel>{field.label}:</S.CardLabel>
                            <span>{field.value}</span>
                        </div>
                    ))}
                </S.CardInfo>
                <S.CardAvatar>
                    {isLoadingImage ? (
                        <Skeleton.Image active style={{ width: 120, height: 160 }} />
                    ) : imageUrl ? (
                        <img src={imageUrl} alt={character.name} />
                    ) : (
                        <UserOutlined />
                    )}
                </S.CardAvatar>
            </S.CardContent>
        </S.StyledCard>
    );
}