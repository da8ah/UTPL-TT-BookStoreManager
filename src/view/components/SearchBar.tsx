import { Icon, Input, useTheme } from "@ui-kitten/components";
import { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "../../hooks/context/ThemeContext";
import { globalStyles as styles } from "../styles/styles";

export default function SearchBar(props: { placeholder: string }) {
    const { themeMode } = useContext(ThemeContext)
    const theme = useTheme()
    const SearchIcon = () => <Icon name="search-outline" fill={themeMode === 'dark' ? 'white' : 'black'} height="30" width="30" />;
    return (
        <View style={[styles.common, { paddingVertical: 10 }]}>
            <Input
                // ref={(component: Input) => authorInputRef.current = component}
                accessoryLeft={<SearchIcon />}
                inputMode="search"
                selectionColor={themeMode === 'dark' ? 'black' : 'gray'}
                cursorColor={themeMode === 'dark' ? theme['color-info-500'] : 'gray'}
                style={{
                    width: "95%",
                    backgroundColor: themeMode === 'dark' ? 'transparent' : 'white',
                    borderColor: themeMode === 'dark' ? 'gray' : 'white',
                    borderRadius: themeMode === 'dark' ? 20 : 5
                }}
                placeholder={props.placeholder}
            // onChangeText={}
            // onFocus={}
            />
        </View>
    );
};
