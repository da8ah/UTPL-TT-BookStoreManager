import { useState } from "react";

export default function useThemeModeCTX() {
    const currentTime = new Date()
    const [themeMode, setThemeMode] = useState<'dark' | 'light'>(
        currentTime.getHours() >= 8 && currentTime.getHours() <= 18 ?
            'light' : 'dark'
    )
    const toggleThemeMode = () => {
        setThemeMode(currentTheme => currentTheme === 'light' ? 'dark' : 'light');
    };
    return [themeMode, toggleThemeMode] as const
}