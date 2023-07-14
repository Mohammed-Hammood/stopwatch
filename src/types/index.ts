export type FormsNames = "delete-timer" | "timer-settings" | "delete-timer" | "add-edit-timer" | "reset-timer" | "pagination"


export interface ModalTypes {
    form: FormsNames;
    title?: string;
    lightDarkMode?: "darkMode" | "lightMode";
    closeButton?: boolean;
    maxWidth?: "maxWidth500" | 'maxWidth600' | 'maxWidth700' | 'maxWidth800' | 'maxWidth900' | 'fullScreen';
}

export type TimerTypes = {
    id: number;
    name: string;
    start: string;
    msec: number;
    color: number[];
    enabled: boolean;
    addToTotal: boolean;
    active: boolean;
    createdAt:string;
}


export type ThemeType = 'light' | 'dark';

export type ThemeContextType = {
    theme: ThemeType;
    themeToggle: () => void;
}