import { Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

export default function Home() {
    return <View style={styles.container}><Text>Home</Text></View>
}

const styles = StyleSheet.create({
    container: {
        flex: 10,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue'
    },
})