import { Button, Text, useTheme } from "@ui-kitten/components";
import { useState } from "react";
import { View } from "react-native";
import ThemeModeToggle from "../components/ThemeModeToggle";
import { globalStyles as styles } from "../styles/styles";

export default function SignIn() {
    const [isOpened, setOpen] = useState(false)
    const theme = useTheme();
    return (
        <View style={[styles.common, styles.body]}>
            <Text>Opened: {`${isOpened}`}</Text>
            <Button
                style={{ backgroundColor: theme['color-info-500'], borderColor: theme['border-basic-color-5'], marginVertical: 4 }}
                onPress={() => setOpen(!isOpened)}
            >OPEN DETAILS</Button>
            <ThemeModeToggle />
        </View>
    )
}