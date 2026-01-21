import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../contexts/ThemeContext/provider';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import './test-i18n';

const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    const queryClient = createTestQueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <StyledThemeProvider theme={{ theme: 'light' }}>
                    <ConfigProvider>
                        <BrowserRouter>
                            {children}
                        </BrowserRouter>
                    </ConfigProvider>
                </StyledThemeProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
