import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";

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
	BookEditor: { bookIndex: number };
};
