import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";

export type BottomTabParamList = {
	Home: undefined,
	Flow: undefined,
	User: undefined
}

export type TabBarHomeProps = BottomTabScreenProps<BottomTabParamList, 'Home'>
export type TabBarFlowProps = BottomTabScreenProps<BottomTabParamList, 'Flow'>
export type TabBarUserProps = BottomTabScreenProps<BottomTabParamList, 'User'>

export type RootStackParamList = {
	BottomNav: NavigatorScreenParams<BottomTabParamList>;
	BookEditor?: { bookISBN: string };
};

export type RootNavProps = NativeStackNavigationProp<RootStackParamList, 'BottomNav'>
export type BookEditorRouteProps = RouteProp<RootStackParamList, "BookEditor">
