import { Layout, Text } from "@ui-kitten/components";
import { StyleSheet, View, ViewProps } from "react-native";
import AuthNav from "./routes/AuthNav";
import ThemeToggle from "./components/ThemeToggle";

export default function MainFrame() {
    return <Layout style={[styles.common, { flex: 1 }]}>
        <Header style={[styles.common, styles.header]} />
        <AuthNav style={[styles.common, styles.body]} />
    </Layout>
}

const Header = (props: ViewProps) => (
    <View {...props}>
        <View style={[styles.common, { width: '20%' }]}>
            <ThemeToggle />
        </View>
        <View style={[styles.common, { width: '60%' }]}>
            <Text category='h1' style={{ color: "white", fontFamily: "serif" }}>
                MANAGER
            </Text>
            <Text category="h5" status="primary" style={{ fontStyle: "italic" }}>
                BOOKSTORE
            </Text>
        </View>
        <View style={[styles.common, { width: '20%' }]} />
    </View>
);

const styles = StyleSheet.create({
    common: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    header: {
        flex: 1,
        backgroundColor: 'black',
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    body: {
        flex: 9
    }
});
