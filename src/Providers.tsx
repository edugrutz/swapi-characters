import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import enUS from "antd/locale/en_US";
import ptBR from "antd/locale/pt_BR";

const queryClient = new QueryClient();

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    const { i18n } = useTranslation();
    const [locale, setLocale] = useState(enUS);

    useEffect(() => {
        const currentLanguage = i18n.language.split("-")[0];
        if (currentLanguage === "pt") {
            setLocale(ptBR);
        } else {
            setLocale(enUS);
        }
    }, [i18n.language]);

    return (
        <QueryClientProvider client={queryClient}>
            <ConfigProvider
                locale={locale}
                theme={{
                    algorithm: theme.darkAlgorithm,
                    token: {
                        colorPrimary: "#FFE81F",
                        colorLink: "#FFE81F",
                    },
                }}
            >
                {children}
            </ConfigProvider>
        </QueryClientProvider>
    );
}
