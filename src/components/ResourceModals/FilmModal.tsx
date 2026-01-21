import { Modal, Descriptions, Spin, Alert, Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { fetchFilmById } from "../../services/swapiDetails";
import type { FilmModalProps } from "./types";
import { ModalTitle, LoadingWrapper, CrawlBox } from "../../styles/antd/components/profile";

export function FilmModal({ filmId, open, onClose, onViewFilm }: FilmModalProps) {
    const { t } = useTranslation();

    const { data: film, isLoading, error } = useQuery({
        queryKey: ["film", filmId],
        queryFn: () => fetchFilmById(filmId!),
        enabled: !!filmId && open,
    });

    const handleViewFilm = () => {
        if (filmId && onViewFilm) {
            onViewFilm(filmId);
        }
    };

    const filmDetails = film ? [
        { label: t("film.episode"), value: `Episode ${film.episode_id}` },
        { label: t("film.director"), value: film.director },
        { label: t("film.producer"), value: film.producer },
        {
            label: t("film.release_date"),
            value: new Date(film.release_date).toLocaleDateString(),
        },
    ] : [];

    return (
        <Modal
            title={<ModalTitle>{film?.title || t("film.loading")}</ModalTitle>}
            open={open}
            onCancel={onClose}
            footer={
                onViewFilm && filmId ? (
                    <Button
                        type="primary"
                        icon={<PlayCircleOutlined />}
                        onClick={handleViewFilm}
                        size="large"
                    >
                        {t("film.view_film")}
                    </Button>
                ) : null
            }
            width={700}
            centered
        >
            {isLoading && (
                <LoadingWrapper>
                    <Spin size="large" />
                </LoadingWrapper>
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
                        <CrawlBox>
                            {film.opening_crawl}
                        </CrawlBox>
                    </div>

                    <Descriptions bordered column={1} size="small" className="custom-descriptions">
                        {filmDetails.map((item) => (
                            <Descriptions.Item key={item.label} label={item.label}>
                                {item.value}
                            </Descriptions.Item>
                        ))}
                    </Descriptions>
                </>
            )}
        </Modal>
    );
}
