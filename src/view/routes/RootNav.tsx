import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { View } from "react-native";
import { AuthContext } from "../../hooks/context/AuthContext";
import SignIn from "../auth/SignIn";
import BookEditor from "../screens/BookEditor";
import { globalStyles as styles } from "../styles/styles";
import BottomNav from "./BottomNav";
import { RootStackParamList } from "./types.nav";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNav() {
	const { isAuth } = useContext(AuthContext)
	return <>
		{
			!isAuth ? <SignIn /> :
				<View testID="root-nav" style={[styles.common, styles.body, { alignItems: 'stretch', backgroundColor: 'transparent' }]}>
					<Stack.Navigator initialRouteName='BottomNav' screenOptions={{ headerShown: false }}>
						<Stack.Screen name='BottomNav' component={BottomNav} />
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
	</>
}
