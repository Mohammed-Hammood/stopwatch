"use client";
import React, { createContext, useState } from "react";
import { ThemeContextType } from "types";
import { LocalStorage } from "utils";

const isBrowser = typeof window !== 'undefined'? true : false; 

export const ThemeContext = createContext<null | ThemeContextType>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<"dark" | "light">(isBrowser ? new LocalStorage().getTheme(): "dark");

    const themeToggle = (): void => {
        const newTheme  = theme === 'dark' ? "light" : "dark"; 
        setTheme(newTheme);
        new LocalStorage().setTheme(newTheme);
    }

    return (
        <ThemeContext.Provider value={{ theme: theme, themeToggle }}>
            {children}
        </ThemeContext.Provider>
    )
}