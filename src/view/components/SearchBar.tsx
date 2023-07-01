import { Icon, Input, useTheme } from "@ui-kitten/components";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { ThemeContext } from "../../hooks/context/ThemeContext";
import { globalStyles } from "../styles/styles";


export default function SearchBar(props: { placeholder: string }) {
    const { themeMode } = useContext(ThemeContext)
    const theme = useTheme()
    const SearchIcon = () => <Icon name="search-outline" fill={themeMode === 'dark' ? 'white' : 'black'} height="30" width="30" />;
    return (
        <View style={[globalStyles.common, { paddingVertical: 5 }]}>
            <Input
                // ref={(component: Input) => authorInputRef.current = component}
                accessoryLeft={<SearchIcon />}
                inputMode="search"
                selectionColor={themeMode === 'dark' ? 'black' : 'gray'}
                cursorColor={themeMode === 'dark' ? theme['color-primary-500'] : 'gray'}
                style={[styles.input, {
                    backgroundColor: themeMode === 'dark' ? 'transparent' : 'white',
                    borderColor: themeMode === 'dark' ? 'gray' : 'white',
                    borderRadius: themeMode === 'dark' ? 20 : 5
                }]}
                placeholder={props.placeholder}
            // onChangeText={}
            // onFocus={}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        width: "95%"
    },
});
