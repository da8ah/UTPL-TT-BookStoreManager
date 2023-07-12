import { Text, useTheme } from "@ui-kitten/components"
import { useContext } from "react"
import { Image, StyleSheet, View } from "react-native"
import { ThemeContext } from "../../../hooks/context/ThemeContext"
import useKeyboard from "../../../hooks/useKeyboard"
import BookInput from "../../components/BookInput"
import DatePicker, { toDate } from "../../components/DatePicker"
import { globalStyles } from "../../styles/styles"

export default function EditorBasicData(props: {
    isNew: boolean
    isEditorDisabled: boolean
    data: {
        isbn: string,
        // imgRef: string,
        title: string,
        author: string,
        releaseDate: string,
        setBasicProperty: (propName: string, value: string) => void
    }
}) {
    const {
        isbn,
        // imgRef,
        title,
        author,
        releaseDate,
        setBasicProperty
    } = props.data

    const [isKeyboardVisible] = useKeyboard()
    const { themeMode } = useContext(ThemeContext)
    const theme = useTheme()

    return <View style={[globalStyles.common, { alignItems: 'stretch' }]}>
        <View
            style={[globalStyles.common, {
                display: isKeyboardVisible ? 'none' : 'flex',
                backgroundColor: themeMode === 'dark' ? 'transparent' : "gainsboro",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: 'stretch',
                borderRadius: 20,
                margin: 5

            }]}
        >
            <Text>Fecha de Lanzamiento: </Text>
            <DatePicker
                disabled={props.isEditorDisabled}
                date={toDate(releaseDate)}
                onSelect={date => setBasicProperty('releaseDate', Intl.DateTimeFormat("ec", {
                    day: "2-digit", month: "2-digit", year: "numeric",
                }).format(date))} />
        </View>
        <View style={{ flexDirection: "row" }}>
            <View style={[styles.topLeftPanel, { backgroundColor: theme['background-basic-color-2'], opacity: props.isEditorDisabled ? 0.5 : 1 }]}>
                <Image style={styles.image} source={require("@Assets/bookstore.png")} />
            </View>
            <View style={[globalStyles.common, styles.topRightPanel]}>
                <View style={styles.inputLayout}>
                    <BookInput disabled={props.isEditorDisabled} title={"Título"} defaultValue={title} onChangeText={input => setBasicProperty('title', input)} />
                </View>
                <View style={styles.inputLayout}>
                    <BookInput disabled={props.isEditorDisabled} keyboardType="number-pad" title={"ISBN"} defaultValue={isbn} onChangeText={input => setBasicProperty('isbn', input)} />
                </View>
                <View style={styles.inputLayout}>
                    <BookInput disabled={props.isEditorDisabled} title={"Autor"} defaultValue={author} onChangeText={input => setBasicProperty('author', input)} />
                </View>
            </View>
        </View>
    </View>
}
const styles = StyleSheet.create({
    topLeftPanel: {
        width: "35%",
        height: 250,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginHorizontal: 5,
    },
    topRightPanel: { backgroundColor: 'transparent', width: "60%", height: 250, justifyContent: "space-around", alignItems: 'stretch' },
    inputLayout: { justifyContent: "center" },
    image: {
        maxWidth: "80%",
        maxHeight: 120,
        resizeMode: "contain",
    },
});