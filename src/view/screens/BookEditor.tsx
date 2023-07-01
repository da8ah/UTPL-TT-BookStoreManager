import { Text, useTheme } from "@ui-kitten/components";
import { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { EditorContext } from "../../hooks/context/EditorContext";

export default function BookEditor(bookIndex: number) {
    const { isEditorOpen, toggleEditor } = useContext(EditorContext)
    const theme = useTheme()

    useEffect(() => {
        toggleEditor()
        console.log(bookIndex);
    }, [])

    useEffect(() => {
        return () => toggleEditor()
    }, [])

    return <View style={[styles.container, { backgroundColor: theme['background-basic-color-3'] }]}>
        <Text category="h1" style={[{ color: theme['color-info-500'] }]}>BookEditor</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
})