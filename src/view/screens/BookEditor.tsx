import { Text, useTheme } from "@ui-kitten/components";
import { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { EditorContext } from "../../hooks/context/EditorContext";
import { RootNavProps } from "./screen";

export default function BookEditor({ route }: { route?: RootNavProps }) {
    const { toggleEditor } = useContext(EditorContext)
    const theme = useTheme()

    useEffect(() => {
        toggleEditor(true)
        route.params && console.log(route.params.bookIndex);
        return () => { toggleEditor(false) }
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