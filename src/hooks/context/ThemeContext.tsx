import { createContext } from 'react';

export const ThemeContext = createContext({
    themeMode: 'dark',
    toggleThemeMode: () => { },
});
