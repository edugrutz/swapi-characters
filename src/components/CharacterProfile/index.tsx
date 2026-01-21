import { useParams, useNavigate } from "react-router-dom";
import { Descriptions, Tag, Spin, Alert, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useCharacters } from "../../hooks/useCharacters";
import { useCharacterDetails } from "../../hooks/useCharacterDetails";
import {
    ProfileContainer,
    ProfileHeader,
    ProfileTitle,
    ProfileContent,
    ProfileSection,
    SectionTitle,
} from "../../styles/antd/components/profile";

export function CharacterProfile() {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { data, isFetching, error } = useCharacters({ page: 1, search: name || "" });
    const character = data?.results?.[0];

    const { films, species, vehicles, starships, isLoading: isLoadingDetails } =
        useCharacterDetails(character || null);

    if (isFetching) {
        return (
            <ProfileContainer>
                <div style={{ textAlign: "center", padding: "4rem" }}>
                    <Spin size="large" />
                </div>
            </ProfileContainer>
        );
    }

    if (error || !character) {
        return (
            <ProfileContainer>
                <Alert
                    message={t("error.loading")}
                    description={error?.message || t("error.character_not_found")}
                    type="error"
                    showIcon
                />
                <Button
                    type="primary"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/")}
                    style={{ marginTop: "1rem" }}
                >
                    {t("profile.back")}
                </Button>
            </ProfileContainer>
        );
    }

    return (
        <ProfileContainer>
            <ProfileHeader>
                <ProfileTitle className="star-wars-font">{character.name}</ProfileTitle>
                <Button
                    type="default"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/")}
                    size="large"
                >
                    {t("profile.back")}
                </Button>
            </ProfileHeader>

            <ProfileContent>
                <ProfileSection>
                    <SectionTitle>{t("profile.basic_info")}</SectionTitle>
                    <Descriptions bordered column={1} size="small" className="custom-descriptions">
                        <Descriptions.Item label={t("table.columns.height")}>
                            {character.height} cm
                        </Descriptions.Item>
                        <Descriptions.Item label={t("table.columns.mass")}>
                            {character.mass} kg
                        </Descriptions.Item>
                        <Descriptions.Item label={t("table.columns.birth_year")}>
                            {character.birth_year}
                        </Descriptions.Item>
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
                        <Descriptions.Item label={t("modal.species")}>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                species.map((s) => s.name).join(", ") || "n/a"
                            )}
                        </Descriptions.Item>
                    </Descriptions>
                </ProfileSection>

                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    <ProfileSection>
                        <SectionTitle className="star-wars-font">{t("modal.films")}</SectionTitle>
                        {isLoadingDetails ? (
                            <Spin size="small" />
                        ) : (
                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                {films.map((f) => (
                                    <Tag key={f.url} color="gold">
                                        {f.title}
                                    </Tag>
                                ))}
                            </div>
                        )}
                    </ProfileSection>

                    {character.vehicles.length > 0 && (
                        <ProfileSection>
                            <SectionTitle className="star-wars-font">{t("modal.vehicles")}</SectionTitle>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    {vehicles.map((v) => (
                                        <Tag key={v.url} color="green">
                                            {v.name}
                                        </Tag>
                                    ))}
                                </div>
                            )}
                        </ProfileSection>
                    )}

                    {character.starships.length > 0 && (
                        <ProfileSection>
                            <SectionTitle className="star-wars-font">{t("modal.starships")}</SectionTitle>
                            {isLoadingDetails ? (
                                <Spin size="small" />
                            ) : (
                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                    {starships.map((s) => (
                                        <Tag key={s.url} color="purple">
                                            {s.name}
                                        </Tag>
                                    ))}
                                </div>
                            )}
                        </ProfileSection>
                    )}
                </div>
            </ProfileContent>

            <div
                style={{
                    marginTop: "2rem",
                    fontSize: "0.8rem",
                    textAlign: "right",
                    opacity: 0.6,
                }}
            >
                <p>
                    {t("modal.created")}: {new Date(character.created).toLocaleDateString()}
                </p>
                <p>
                    {t("modal.edited")}: {new Date(character.edited).toLocaleDateString()}
                </p>
            </div>
        </ProfileContainer>
    );
}
