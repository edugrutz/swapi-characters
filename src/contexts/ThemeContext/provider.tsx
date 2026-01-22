import React, { createContext, useContext, useState, useEffect } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useTranslation } from "react-i18next";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import enUS from "antd/locale/en_US";
import ptBR from "antd/locale/pt_BR";
import type { ThemeContextType, Theme } from "./types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { i18n } = useTranslation();
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme");
        return (savedTheme as Theme) || "dark";
    });
    const [locale, setLocale] = useState(enUS);

    useEffect(() => {
        const currentLanguage = i18n.language.split("-")[0];
        setLocale(currentLanguage === "pt" ? ptBR : enUS);
    }, [i18n.language]);

    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === "dark" ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ConfigProvider
                locale={locale}
                theme={{
                    algorithm:
                        theme === "dark"
                            ? antdTheme.darkAlgorithm
                            : antdTheme.defaultAlgorithm,
                    token: {
                        colorPrimary: theme === "dark" ? "#ffe81f" : "#FFE81F",
                        colorLink: theme === "dark" ? "#ffe81f" : "#1890ff",
                        colorBgBase: theme === "dark" ? "#000000" : "#fafafa",
                        colorTextBase: theme === "dark" ? "#ffffff" : "#1f1f1f",
                    },
                }}
            >
                <StyledThemeProvider theme={{ theme }}>
                    {children}
                </StyledThemeProvider>
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
