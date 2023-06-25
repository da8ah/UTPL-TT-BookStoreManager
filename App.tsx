import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Main from "./src/view/Main";
import { ThemeContext } from "./src/view/theme/ThemeContext";
import { default as customTheme } from './src/view/theme/theme.json';

export default () => {
	const [theme, setTheme] = React.useState<'dark' | 'light'>('dark');
	const toggleTheme = () => {
		const nextTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(nextTheme);
	};
	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<ThemeContext.Provider value={{ theme, toggleTheme }}>
				<ApplicationProvider {...eva} theme={{ ...eva[theme], ...customTheme }}>
					<SafeAreaView style={styles.container}>
						<View style={{ height: 25, backgroundColor: "transparent" }} />
						<Main />
						<StatusBar style="auto" />
					</SafeAreaView>
				</ApplicationProvider>
			</ThemeContext.Provider>
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
