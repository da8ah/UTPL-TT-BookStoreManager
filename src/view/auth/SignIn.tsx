import { Button, Layout, Text, useTheme } from "@ui-kitten/components";
import React from "react";
import ThemeToggle from "../components/ThemeToggle";

export default function SignIn() {
    const [isOpened, setOpen] = React.useState(false)
    const theme = useTheme();
    return (
        <Layout style={{ flex: 6, width: "100%", justifyContent: 'center', alignItems: 'center' }}>
            <Text>Opened: {`${isOpened}`}</Text>
            <Button
                style={{ backgroundColor: theme['color-danger-500'], borderColor: theme['border-basic-color-5'], marginVertical: 4 }}
                onPress={() => setOpen(!isOpened)}
            >OPEN DETAILS</Button>
            <ThemeToggle />
        </Layout>
    )
}
