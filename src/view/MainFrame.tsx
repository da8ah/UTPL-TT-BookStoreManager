import { NavigationContainer } from "@react-navigation/native";
import { Layout, Text } from "@ui-kitten/components";
import { useContext } from "react";
import { View, ViewProps } from "react-native";
import { AuthContext } from "../hooks/context/AuthContext";
import { ThemeContext } from "../hooks/context/ThemeContext";
import BookEditorToggle from "./components/BookEditorToggle";
import ThemeModeToggle from "./components/ThemeModeToggle";
import RootNav from "./routes/RootNav";
import { darkNavTheme, lightNavTheme, globalStyles as styles } from "./styles/styles";


export default function MainFrame() {
    const { themeMode } = useContext(ThemeContext);
    return <Layout style={[styles.common, { flex: 1 }]}>
        <NavigationContainer theme={themeMode === 'dark' ? darkNavTheme : lightNavTheme}>
            <Header style={[styles.common, styles.header, { backgroundColor: '#272729' }]} />
            <RootNav />
        </NavigationContainer>
    </Layout>
}

const Header = (props: ViewProps) => {
    const { isAuth } = useContext(AuthContext)
    return (
        <View {...props}>
            <View style={[styles.common, { width: '20%' }]}>
                <ThemeModeToggle />
            </View>
            <View style={[styles.common, { width: '60%' }]}>
                <Text category='h1' style={{ color: 'white', fontSize: 32 }}>
                    MANAGER
                </Text>
                <Text category="h2" status="info" style={{ fontSize: 10, fontFamily: "serif", fontStyle: "italic" }}>
                    BOOKSTORE
                </Text>
            </View>
            <View style={[styles.common, { width: '20%' }]}>
                {isAuth && <BookEditorToggle />}
            </View>
        </View>
    )
};
