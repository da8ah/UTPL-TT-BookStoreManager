import { Input, InputProps, Text, useTheme } from "@ui-kitten/components";
import { LegacyRef, forwardRef, useContext, useState } from "react";
import { ColorValue, ScrollView, StyleSheet, View } from "react-native";
import { ThemeContext } from "../../hooks/context/ThemeContext";

type BookInputProps = Omit<InputProps, 'disabled'> & {
    ref?: (input: any) => any,
    textarea?: boolean,
    title: string
    titleFontSize?: number,
    capitalized?: boolean
    disabled?: boolean
    formColor?: ColorValue
}

const BookInput = forwardRef((props: BookInputProps, ref: LegacyRef<Input>) => {
    const { themeMode } = useContext(ThemeContext)
    const theme = useTheme()
    const [text, setText] = useState(props.defaultValue || '')
    return <View style={styles.inputLayout}>
        <View style={[styles.inputTitle, { backgroundColor: props.formColor || 'darkgrey' }]}>
            <Text adjustsFontSizeToFit style={{ fontSize: props.titleFontSize }}>{props.title}</Text>
        </View>
        {props.textarea ?
            <Input
                multiline
                ref={ref}
                {...props}
                disabled={props.disabled}
                autoCorrect={props.disabled}
                showSoftInputOnFocus={!props.disabled}
                textStyle={{ height: 50 }}
                style={[styles.inputScroll, props.style, { borderColor: props.formColor || 'darkgrey' }]}
                selectionColor={themeMode === 'dark' ? theme['color-info-500'] : undefined}
                cursorColor={themeMode === 'dark' ? theme['color-info-500'] : 'gray'}
                defaultValue={text}
                onChangeText={input => setText(input)}
            />
            :
            <ScrollView
                style={[styles.inputScroll, props.style, { borderColor: props.formColor || 'darkgrey' }]}
                horizontal
                alwaysBounceHorizontal={props.disabled}
                showsVerticalScrollIndicator={false}
                fadingEdgeLength={50}
                contentContainerStyle={{ minWidth: '100%', alignItems: 'center', minHeight: 40, paddingHorizontal: 3 }}
            >
                <Input
                    ref={ref}
                    {...props}
                    disabled={props.disabled}
                    autoCorrect={props.disabled}
                    showSoftInputOnFocus={!props.disabled}
                    pointerEvents={props.disabled ? 'none' : 'auto'}
                    style={styles.input}
                    selectionColor={themeMode === 'dark' ? theme['color-info-500'] : undefined}
                    cursorColor={themeMode === 'dark' ? theme['color-info-500'] : 'gray'}
                    defaultValue={text}
                    onChangeText={input => setText(input)}
                />
            </ScrollView>
        }
    </View>
})

export default BookInput;

const styles = StyleSheet.create({
    inputLayout: { justifyContent: "center" },
    inputTitle: {
        width: 80,
        maxWidth: '30%',
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    inputScroll: {
        width: "100%",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
        borderBottomWidth: 2
    },
    input: { width: "100%", backgroundColor: 'transparent', borderWidth: 0 }
})