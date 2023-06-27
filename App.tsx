import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { AuthContext } from "./src/hooks/context/AuthContext";
import { EditorContext } from "./src/hooks/context/EditorContext";
import { ThemeContext } from "./src/hooks/context/ThemeContext";
import { useAuth } from "./src/hooks/useAuth";
import useBookEditor from "./src/hooks/useBookEditor";
import useThemeMode from "./src/hooks/useThemeMode";
import MainFrame from "./src/view/MainFrame";
import customTheme from './src/view/styles/theme.json';


export default () => {
	const [isAuth, tryToAuth] = useAuth()
	const [themeMode, toggleThemeMode] = useThemeMode()
	const [isEditorOpen, toggleEditor] = useBookEditor()
	return (
		<>
			<AuthContext.Provider value={{ isAuth, tryToAuth }}>
				<IconRegistry icons={EvaIconsPack} />
				<ThemeContext.Provider value={{ themeMode, toggleThemeMode }}>
					<ApplicationProvider {...eva} theme={{ ...eva[themeMode], ...customTheme }}>
						<EditorContext.Provider value={{ isEditorOpen, toggleEditor }}>
							<View style={{ height: 25, backgroundColor: "transparent" }} />
							<SafeAreaView style={styles.container}>
								<MainFrame />
								<StatusBar style="auto" />
							</SafeAreaView>
						</EditorContext.Provider>
					</ApplicationProvider>
				</ThemeContext.Provider>
			</AuthContext.Provider>
		</>)
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		alignItems: 'center',
		justifyContent: 'center',
	},
});
