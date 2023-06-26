import { Button, Icon } from "@ui-kitten/components";
import { useContext } from "react";
import { ThemeContext } from "../../hooks/context/ThemeContext";

export default function ThemeModeToggle() {
    const themeContext = useContext(ThemeContext);
    const SunIcon = () => <Icon name="sun" fill="white" height="30" width="30" />;
    const MoonIcon = () => <Icon name="moon" fill="white" height="30" width="30" />;
    return <Button accessoryLeft={themeContext.themeMode === "dark" ? SunIcon : MoonIcon} style={{ backgroundColor: 'transparent', borderWidth: 0 }} onPress={themeContext.toggleThemeMode} />
}