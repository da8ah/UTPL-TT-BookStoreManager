import { Button, Text, useTheme } from "@ui-kitten/components";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../../hooks/context/AuthContext";
import { globalStyles as styles } from "../styles/styles";

export default function SignIn() {
    const { tryToAuth } = useContext(AuthContext)
    const theme = useTheme();
    const [isLoading, setLoading] = useState(false)
    useEffect(() => { }, [isLoading])
    return (
        <View style={[styles.common, styles.body]}>
            {isLoading ?
                <LoadingAlert /> :
                <>
                    <Text>Auth: {`${isLoading}`}</Text>
                    <Button
                        style={{ backgroundColor: theme['color-info-500'], borderColor: theme['border-basic-color-5'], marginVertical: 4 }}
                        onPress={() => {
                            setLoading(true)
                            tryToAuth()
                            setTimeout(() => {
                                setLoading(false)
                            }, 2000);
                        }}
                    >Auth</Button>
                </>
            }
        </View>
    )
}

const LoadingAlert = () => (
    <>
        <Text status='info' appearance='hint' style={{ fontSize: 10, fontStyle: "italic", textTransform: "uppercase" }}>
            Loading
        </Text>
        <ActivityIndicator />
    </>
);
