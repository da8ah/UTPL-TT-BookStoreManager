import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export default function User() {
    return <Layout style={styles.container}><Text>User</Text></Layout>
}

const styles = StyleSheet.create({
    container: {
        flex: 7,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
})