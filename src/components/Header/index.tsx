import { Segmented } from "antd";
import logo from "../../assets/images/storm.png";
import { useTranslation } from "react-i18next";
import {
	StyledHeader,
	ContentSection,
	TextContainer,
	ResponsiveTitle,
	ResponsiveText,
} from "../../styles/antd/components/header";

export function Header() {
	const { t, i18n } = useTranslation();

	const handleLanguageChange = (value: string | number) => {
		i18n.changeLanguage(value as string);
	};

	return (
		<StyledHeader>
			<ContentSection>
				<img
					src={logo}
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

			<Segmented
				value={i18n.language.split("-")[0]}
				options={[
					{ label: "EN", value: "en" },
					{ label: "PT", value: "pt" },
				]}
				onChange={handleLanguageChange}
				style={{ flexShrink: 0 }}
			/>
		</StyledHeader>
	);
}
