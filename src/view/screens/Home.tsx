import { Text, useTheme } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

export default function Home() {
    const theme = useTheme()
    return <View style={[styles.container]}>
        <Text category="h1" style={[{ color: theme['color-info-500'] }]}>Home</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
})