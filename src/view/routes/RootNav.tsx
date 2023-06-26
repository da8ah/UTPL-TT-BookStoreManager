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
			<Stack.Group>
				<Stack.Screen name='BottomNav' component={BottomNav} />
			</Stack.Group>
			<Stack.Group
				screenOptions={{
					animation: "fade_from_bottom",
					animationDuration: 0.1
				}}
			>
				{/* MODALS */}
				<Stack.Screen name='BookEditor' component={BookEditor} />
			</Stack.Group>
		</Stack.Navigator>
	</View>
}
