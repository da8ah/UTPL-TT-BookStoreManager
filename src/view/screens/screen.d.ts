import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NativeStackNavigatorProps } from "@react-navigation/native-stack/lib/typescript/src/types";

export type RootStackParamList = {
	BottomNav: NativeStackScreenProps;
	BookEditor: { bookIndex: number };
};

export type RootNavProps = NativeStackNavigatorProps<RootStackParamList, "BottomNav">;