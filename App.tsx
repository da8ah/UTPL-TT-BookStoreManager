import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { AuthContext } from "./src/hooks/context/AuthContext";
import { EditorContext } from "./src/hooks/context/EditorContext";
import { ThemeContext } from "./src/hooks/context/ThemeContext";
import { useAuthCTX } from "./src/hooks/context/useAuthCTX";
import useBookEditorCTX from "./src/hooks/context/useBookEditorCTX";
import useThemeModeCTX from "./src/hooks/context/useThemeModeCTX";
import MainFrame from "./src/view/MainFrame";
import { globalStyles as styles } from "./src/view/styles/styles";
import customTheme from "./src/view/styles/theme.json";


export default () => {
	const [isAuth, tryToAuth, logout] = useAuthCTX()
	const [themeMode, toggleThemeMode] = useThemeModeCTX()
	const [isEditorOpen, toggleEditor] = useBookEditorCTX()
	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ThemeContext.Provider value={{ themeMode, toggleThemeMode }}>
				<ApplicationProvider {...eva} theme={{ ...eva[themeMode], ...customTheme.basic, ...customTheme[themeMode] }}>
					<AuthContext.Provider value={{ isAuth, tryToAuth, logout }}>
						<EditorContext.Provider value={{ isEditorOpen, toggleEditor }}>
							<View style={{ height: 25, backgroundColor: '#272729' }} />
							<SafeAreaView style={[styles.common, { flex: 1 }]}>
								<MainFrame />
								<StatusBar style="auto" />
							</SafeAreaView>
						</EditorContext.Provider>
					</AuthContext.Provider>
				</ApplicationProvider>
			</ThemeContext.Provider>
		</>)
};