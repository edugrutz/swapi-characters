import { Typography, Segmented } from "antd";
import logo from "../../assets/images/storm.png";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

export function Header() {
	const { t, i18n } = useTranslation();

	const handleLanguageChange = (value: string | number) => {
		i18n.changeLanguage(value as string);
	};

	return (
		<header
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "1rem 0",
				gap: "1.5rem",
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
				<img
					src={logo}
					alt="Star Wars Logo"
					style={{
						height: "80px",
						width: "auto",
					}}
				/>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
					}}
				>
					<Title
						level={1}
						style={{
							margin: 0,
							fontSize: "2.5rem",
							fontWeight: "bold",
							lineHeight: 1.2,
						}}
					>
						{t("header.title")}
					</Title>
					<Typography.Text
						style={{ color: "#FFE81F", fontSize: "1rem", opacity: 0.8 }}
					>
						{t("header.description")}
					</Typography.Text>
				</div>
			</div>

			<Segmented
				value={i18n.language.split("-")[0]}
				options={[
					{ label: "EN", value: "en" },
					{ label: "PT", value: "pt" },
				]}
				onChange={handleLanguageChange}
			/>
		</header>
	);
}
