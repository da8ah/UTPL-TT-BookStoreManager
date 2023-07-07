import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import BookEditor from "../screens/BookEditor";
import { RootNavProps } from "../screens/screen";
import { globalStyles as styles } from "../styles/styles";
import BottomNav from "./BottomNav";

const Stack = createNativeStackNavigator<RootNavProps>();

export default function RootNav() {
	return <View style={[styles.common, styles.body, { alignItems: 'stretch', backgroundColor: 'transparent' }]}>
		<Stack.Navigator initialRouteName='BottomNav' screenOptions={{ headerShown: false }}>
			<Stack.Screen name='BottomNav' component={BottomNav} />
			{/* MODALS */}
			<Stack.Screen
				name='BookEditor'
				component={BookEditor}
				options={{
					animation: "fade_from_bottom",
					animationTypeForReplace: "pop",
					animationDuration: 0.1
				}}
			/>
		</Stack.Navigator>
	</View>
}
