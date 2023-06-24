import { Button, useTheme } from "@ui-kitten/components";
import React from "react";
import { ThemeContext } from "../theme/ThemeContext";

export default function ThemeToggle() {
    const themeContext = React.useContext(ThemeContext);
    const theme = useTheme();

    return <Button style={{ backgroundColor: theme['background-basic-color-1'], marginVertical: 4 }} onPress={themeContext.toggleTheme}>TOGGLE THEME</Button>
}