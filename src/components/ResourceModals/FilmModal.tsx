import { Modal, Descriptions, Spin, Alert } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchFilmById } from "../../services/swapiDetails";
import type { FilmModalProps } from "./types";

export function FilmModal({ filmId, open, onClose }: FilmModalProps) {
    const { t } = useTranslation();

    const { data: film, isLoading, error } = useQuery({
        queryKey: ["film", filmId],
        queryFn: () => fetchFilmById(filmId!),
        enabled: !!filmId && open,
    });

    return (
        <Modal
            title={
                <span className="star-wars-font" style={{ fontSize: "1.5rem" }}>
                    {film?.title || t("film.loading")}
                </span>
            }
            open={open}
            onCancel={onClose}
            footer={null}
            width={700}
            centered
        >
            {isLoading && (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                    <Spin size="large" />
                </div>
            )}

            {error && (
                <Alert
                    message={t("error.loading")}
                    description={error.message}
                    type="error"
                    showIcon
                />
            )}

            {film && (
                <>
                    <div style={{ marginBottom: "1.5rem" }}>
                        <h4 style={{ marginBottom: "0.5rem" }}>{t("film.opening_crawl")}</h4>
                        <p style={{
                            fontStyle: "italic",
                            lineHeight: "1.6",
                            maxHeight: "200px",
                            overflowY: "auto",
                            padding: "1rem",
                            background: "rgba(255, 232, 31, 0.05)",
                            borderRadius: "4px"
                        }}>
                            {film.opening_crawl}
                        </p>
                    </div>

                    <Descriptions bordered column={1} size="small" className="custom-descriptions">
                        <Descriptions.Item label={t("film.episode")}>
                            Episode {film.episode_id}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("film.director")}>
                            {film.director}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("film.producer")}>
                            {film.producer}
                        </Descriptions.Item>
                        <Descriptions.Item label={t("film.release_date")}>
                            {new Date(film.release_date).toLocaleDateString()}
                        </Descriptions.Item>
                    </Descriptions>
                </>
            )}
        </Modal>
    );
}
