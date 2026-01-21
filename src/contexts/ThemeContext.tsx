import React, { createContext, useContext, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme");
        return (savedTheme as Theme) || "dark";
    });

    const toggleTheme = () => {
        setTheme((prev) => {
            const newTheme = prev === "dark" ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
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
