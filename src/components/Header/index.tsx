import { Segmented } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import logo from "../../assets/images/logo.png";
import storm from "../../assets/images/storm.png";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import {
	StyledHeader,
	ContentSection,
	TextContainer,
	ResponsiveTitle,
	ResponsiveText,
	LogoImage,
	SettingsSection,
	ThemeToggleButton,
} from "../../styles/antd/components/header";

export function Header() {
	const { t, i18n } = useTranslation();
	const { theme, toggleTheme } = useTheme();
	const navigate = useNavigate();

	const handleLanguageChange = (value: string | number) => {
		i18n.changeLanguage(value as string);
	};

	return (
		<StyledHeader>
			<ContentSection onClick={() => navigate("/")}>
				<LogoImage
					src={theme === "dark" ? storm : logo}
					alt="Star Wars Logo"
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

			<SettingsSection>
				<ThemeToggleButton
					type="text"
					icon={theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
					onClick={toggleTheme}
				/>
				<Segmented
					value={i18n.language.split("-")[0]}
					options={[
						{ label: "EN", value: "en" },
						{ label: "PT", value: "pt" },
					]}
					onChange={handleLanguageChange}
				/>
			</SettingsSection>
		</StyledHeader>
	);
}
