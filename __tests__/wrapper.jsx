import * as eva from "@eva-design/eva"
import { NavigationContainer } from "@react-navigation/native"
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"
import { EvaIconsPack } from "@ui-kitten/eva-icons"
import { AuthContext } from "../src/hooks/context/AuthContext"
import { ThemeContext } from "../src/hooks/context/ThemeContext"
import useThemeModeCTX from "../src/hooks/context/useThemeModeCTX"
import customTheme from "../src/view/styles/theme.json"
import { darkNavTheme, lightNavTheme } from "../src/view/styles/styles"


export const authTestCTX = {
    isAuth: true,
    tryToAuth: jest.fn(async () => authTestCTX.isAuth = true),
    logout: jest.fn(),
}

const Wrapper = (props) => {
    const [themeMode, toggleThemeMode] = useThemeModeCTX()
    return <>
        <IconRegistry icons={EvaIconsPack} />
        <ThemeContext.Provider value={{ themeMode, toggleThemeMode }}>
            <ApplicationProvider {...eva} theme={{ ...eva[themeMode], ...customTheme.basic, ...customTheme[themeMode] }}>
                <AuthContext.Provider value={{ ...authTestCTX }}>
                    <NavigationContainer theme={themeMode === 'dark' ? darkNavTheme : lightNavTheme}>
                        {props.children}
                    </NavigationContainer>
                </AuthContext.Provider>
            </ApplicationProvider>
        </ThemeContext.Provider>
    </>
}

export default Wrapper