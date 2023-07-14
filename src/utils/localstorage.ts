"use client";

import { ThemeType, TimerTypes } from "types";

const isBrowser = typeof window !== 'undefined' ? true : false;

type LocalStorageTypes = {
    timers: TimerTypes[];
    theme: ThemeType;
}

const InitialData: LocalStorageTypes = {
    theme: 'dark',
    timers: [
        {
            id: new Date().getTime(),
            name: "Default timer",
            msec: 0,
            color: [0, 0, 0, 1],
            enabled: false,
            addToTotal: true,
            active: true,
            createdAt: new Date().toUTCString(),
            start: ""
        }
    ],
}

export class LocalStorage {
    __name__: string = 'stopwatch';
    data: LocalStorageTypes = JSON.parse((isBrowser ? localStorage.getItem(this.__name__) : null) || JSON.stringify(InitialData));

    save: () => void;
    constructor() {
        this.save = (): void => localStorage.setItem(this.__name__, JSON.stringify(this.data));
        this.save();
    }
    setTheme(theme: ThemeType) {
        this.data.theme = theme;
        this.save();
    }
    getTheme(): ThemeType {
        return this.data.theme;
    }
    setTimers(data: TimerTypes[]) {
        this.data.timers = data;
        this.save();
    }

    getTimers() {
        return this.data.timers;
    }

    getActiveTimer(): TimerTypes | null {
        const activeTimer = this.data.timers.find(item => item.active);
        if (activeTimer) return activeTimer;
        return null
    }

}
