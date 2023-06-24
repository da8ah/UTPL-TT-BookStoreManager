import { Text } from "@ui-kitten/components";
import { SafeAreaView, StyleSheet, View } from "react-native";
import MainNav from "./routes/MainNav";

const Header = () => (
    <View style={styles.header}>
        <Text category='h1' style={{ color: "white", fontFamily: "serif" }}>
            BOOKSTORE
        </Text>
        <Text category="h5" status="primary" style={{ fontStyle: "italic" }}>
            MANAGER
        </Text>
    </View>
);

export default function Main() {
    return <SafeAreaView style={styles.container}>
        <Header />
        <MainNav />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: 'black'
    }
});
