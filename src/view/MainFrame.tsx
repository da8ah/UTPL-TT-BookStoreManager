import { NavigationContainer } from "@react-navigation/native";
import { Layout, Text } from "@ui-kitten/components";
import { useContext } from "react";
import { View, ViewProps } from "react-native";
import { ThemeContext } from "../hooks/context/ThemeContext";
import BookEditorToggle from "./components/BookEditorToggle";
import ThemeModeToggle from "./components/ThemeModeToggle";
import AuthNav from "./routes/AuthNav";
import { darkNavTheme, lightNavTheme, globalStyles as styles } from "./styles/styles";


export default function MainFrame() {
    const { themeMode } = useContext(ThemeContext);
    return <Layout style={[styles.common, { flex: 1 }]}>
        <NavigationContainer theme={themeMode === 'dark' ? darkNavTheme : lightNavTheme}>
            <Header style={[styles.common, styles.header]} />
            <AuthNav />
        </NavigationContainer>
    </Layout>
}

const Header = (props: ViewProps) => (
    <View {...props}>
        <View style={[styles.common, { width: '20%' }]}>
            <ThemeModeToggle />
        </View>
        <View style={[styles.common, { width: '60%' }]}>
            <Text category='h2' style={{ color: 'white', fontSize: 12, fontStyle: "italic" }}>
                MANAGER
            </Text>
            <Text category="h1" status="primary" style={{ fontFamily: "serif" }}>
                BOOKSTORE
            </Text>
        </View>
        <View style={[styles.common, { width: '20%' }]}>
            <BookEditorToggle />
        </View>
    </View>
);
