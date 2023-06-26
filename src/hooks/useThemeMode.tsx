import { useState } from "react";

export default function useThemeMode() {
    const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
    const toggleThemeMode = () => {
        setThemeMode(currentTheme => currentTheme === 'light' ? 'dark' : 'light');
    };
    return [themeMode, toggleThemeMode] as const
}