import { StyleSheet } from "react-native";
import theme from './theme.json'

export const globalStyles = StyleSheet.create({
    common: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    header: {
        flex: 1,
        backgroundColor: 'black',
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    body: {
        flex: 9
    }
});

export const darkNavTheme = {
    dark: true,
    colors: {
        primary: 'transparent',
        background: theme['tab-dark-basic-color'],
        card: 'transparent',
        text: 'transparent',
        border: 'transparent',
        notification: 'transparent',
    },
};

export const lightNavTheme = {
    dark: false,
    colors: {
        primary: 'transparent',
        background: theme['tab-basic-color'],
        card: 'transparent',
        text: 'transparent',
        border: 'transparent',
        notification: 'transparent',
    },
};
