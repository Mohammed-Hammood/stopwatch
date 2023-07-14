"use client";
import React, { createContext, useState } from "react";
import { ThemeContextType } from "types";
import { LocalStorage } from "utils";


export const ThemeContext = createContext<null | ThemeContextType>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const ls = new LocalStorage();
    const [theme, setTheme] = useState<"dark" | "light">(ls.getTheme());

    const themeToggle = (): void => {
        const newTheme  = theme === 'dark' ? "light" : "dark"; 
        setTheme(newTheme);
        ls.setTheme(newTheme);
    }

    return (
        <ThemeContext.Provider value={{ theme: theme, themeToggle }}>
            {children}
        </ThemeContext.Provider>
    )
}