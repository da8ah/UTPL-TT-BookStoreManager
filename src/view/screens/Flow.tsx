import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export default function Flow() {
    return <Layout style={styles.container}><Text>Flow</Text></Layout>
}

const styles = StyleSheet.create({
    container: {
        flex: 7,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
})