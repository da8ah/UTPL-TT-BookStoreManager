import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { AuthContext } from "./src/hooks/context/AuthContext";
import { EditorContext } from "./src/hooks/context/EditorContext";
import { ThemeContext } from "./src/hooks/context/ThemeContext";
import { useAuth } from "./src/hooks/context/useAuth";
import useBookEditor from "./src/hooks/context/useBookEditor";
import useThemeMode from "./src/hooks/context/useThemeMode";
import MainFrame from "./src/view/MainFrame";
import customTheme from "./src/view/styles/theme.json";
import { globalStyles as styles } from "./src/view/styles/styles";


export default () => {
	const [isAuth, tryToAuth, logout] = useAuth()
	const [themeMode, toggleThemeMode] = useThemeMode()
	const [isEditorOpen, toggleEditor] = useBookEditor()
	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ThemeContext.Provider value={{ themeMode, toggleThemeMode }}>
				<ApplicationProvider {...eva} theme={{ ...eva[themeMode], ...customTheme.basic, ...customTheme[themeMode] }}>
					<AuthContext.Provider value={{ isAuth, tryToAuth, logout }}>
						<EditorContext.Provider value={{ isEditorOpen, toggleEditor }}>
							<View style={{ height: 25, backgroundColor: "transparent" }} />
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