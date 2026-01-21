import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme as antdTheme } from "antd";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import enUS from "antd/locale/en_US";
import ptBR from "antd/locale/pt_BR";

const queryClient = new QueryClient();

interface ProvidersProps {
    children: ReactNode;
}

function AntdConfigProvider({ children }: { children: ReactNode }) {
    const { i18n } = useTranslation();
    const { theme } = useTheme();
    const [locale, setLocale] = useState(enUS);

    useEffect(() => {
        const currentLanguage = i18n.language.split("-")[0];
        setLocale(currentLanguage === "pt" ? ptBR : enUS);
    }, [i18n.language]);

    return (
        <ConfigProvider
            locale={locale}
            theme={{
                algorithm:
                    theme === "dark"
                        ? antdTheme.darkAlgorithm
                        : antdTheme.defaultAlgorithm,
                token: {
                    colorPrimary: theme === "dark" ? "#ffe81f" : "#000000ff",
                    colorLink: theme === "dark" ? "#ffe81f" : "#000000ff",
                    colorBgBase: theme === "dark" ? "#000000" : "#ffffff",
                    colorTextBase: theme === "dark" ? "#ffffff" : "#000000",
                },
            }}
        >
            <StyledThemeProvider theme={{ theme }}>
                {children}
            </StyledThemeProvider>
        </ConfigProvider>
    );
}

export function Providers({ children }: ProvidersProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <AntdConfigProvider>{children}</AntdConfigProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
