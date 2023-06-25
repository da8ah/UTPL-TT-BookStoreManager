import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import BottomNav from "./routes/BottomNav";

const Header = () => (
    <View style={[styles.common, styles.header]}>
        <Text category='h1' style={{ color: "white", fontFamily: "serif" }}>
            BOOKSTORE
        </Text>
        <Text category="h5" status="primary" style={{ fontStyle: "italic" }}>
            MANAGER
        </Text>
    </View>
);

export default function Main() {
    return <Layout style={styles.common}>
        <Header />
        <BottomNav style={styles.body} />
    </Layout>
}

const styles = StyleSheet.create({
    common: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    header: {
        backgroundColor: 'black'
    },
    body: {
        flex: 9,
        width: '100%'
    }
});
