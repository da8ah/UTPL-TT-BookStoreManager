import { Button, Icon, useTheme } from "@ui-kitten/components";
import React from "react";
import { ThemeContext } from "../theme/ThemeContext";

export default function ThemeToggle() {
    const themeContext = React.useContext(ThemeContext);
    const theme = useTheme();

    const SunIcon = () => <Icon name="sun-outline" fill="white" height="30" width="30" />;
    const MoonIcon = () => <Icon name="moon-outline" fill="white" height="30" width="30" />;
    return <Button accessoryLeft={themeContext.theme === "dark" ? SunIcon : MoonIcon} style={{ backgroundColor: 'transparent', borderWidth: 0 }} onPress={themeContext.toggleTheme} />
}