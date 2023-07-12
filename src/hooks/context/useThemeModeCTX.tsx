import { useEffect, useState } from "react";

export default function useThemeModeCTX() {
    const [currentTime] = useState(new Date())
    const [themeMode, setThemeMode] = useState<'dark' | 'light'>(
        currentTime.getHours() > 8 && currentTime.getHours() < 18 ?
            'light' : 'dark'
    )

    useEffect(() => {
        const interval = setInterval(() => {
            setThemeMode(currentTime.getHours() > 8 && currentTime.getHours() < 18 ? 'light' : 'dark')
        }, 60000)
        return () => clearInterval(interval)
    })

    const toggleThemeMode = () => {
        setThemeMode(currentTheme => currentTheme === 'light' ? 'dark' : 'light');
    };
    return [themeMode, toggleThemeMode] as const
}