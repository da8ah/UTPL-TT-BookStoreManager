import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

export default () => (
	<>
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider {...eva} theme={eva.light}>
			<View style={{ height: 25, backgroundColor: "transparent" }} />
			<SafeAreaView style={styles.container}>
				<Text category="h1">Hello World!</Text>
				<StatusBar style="auto" />
			</SafeAreaView>
		</ApplicationProvider>
	</>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
