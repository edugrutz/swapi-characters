import { Segmented, Button } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import storm from "../../assets/images/storm.png";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";
import {
	StyledHeader,
	ContentSection,
	TextContainer,
	ResponsiveTitle,
	ResponsiveText,
} from "../../styles/antd/components/header";

export function Header() {
	const { t, i18n } = useTranslation();
	const { theme, toggleTheme } = useTheme();

	const handleLanguageChange = (value: string | number) => {
		i18n.changeLanguage(value as string);
	};

	return (
		<StyledHeader>
			<ContentSection>
				<img
					src={theme === "dark" ? storm : logo}
					alt="Star Wars Logo"
					style={{
						height: "clamp(60px, 10vw, 80px)",
						width: "auto",
					}}
				/>
				<TextContainer>
					<ResponsiveTitle level={1}>
						{t("header.title")}
					</ResponsiveTitle>
					<ResponsiveText>
						{t("header.description")}
					</ResponsiveText>
				</TextContainer>
			</ContentSection>

			<div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
				<Button
					type="text"
					icon={theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
					onClick={toggleTheme}
					style={{
						fontSize: "1.2rem",
						color: theme === 'dark' ? '#ffffffff' : '#000000ff',
						border: "1px solid " + (theme === 'dark' ? '#ffffffff' : '#000000ff')
					}}
				/>
				<Segmented
					value={i18n.language.split("-")[0]}
					options={[
						{ label: "EN", value: "en" },
						{ label: "PT", value: "pt" },
					]}
					onChange={handleLanguageChange}
				/>
			</div>
		</StyledHeader>
	);
}
