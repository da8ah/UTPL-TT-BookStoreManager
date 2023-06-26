import { Button, Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { View, ViewProps } from "react-native";
import ThemeToggle from "../components/ThemeToggle";

export default function SignIn(props: ViewProps) {
    const [isOpened, setOpen] = React.useState(false)
    const theme = useTheme();
    return (
        <View {...props}>
            <Text>Opened: {`${isOpened}`}</Text>
            <Button
                style={{ backgroundColor: theme['color-danger-500'], borderColor: theme['border-basic-color-5'], marginVertical: 4 }}
                onPress={() => setOpen(!isOpened)}
            >OPEN DETAILS</Button>
            <ThemeToggle />
        </View>
    )
}