import { useNavigation } from "@react-navigation/native";
import { Button, Icon, useTheme } from "@ui-kitten/components";
import { useContext } from "react";
import { Keyboard } from "react-native";
import { EditorContext } from "../../hooks/context/EditorContext";
import useAppViewModel from "../../hooks/context/useAppViewModel";
import { RootNavProps } from "../routes/types.nav";

export default function BookEditorToggle() {
    const { vimo } = useAppViewModel()
    const { isEditorOpen } = useContext(EditorContext)
    const navigation = useNavigation<RootNavProps>()
    const theme = useTheme()

    const Open = () => <Icon name="plus" fill="white" height="30" width="30" />;
    const Close = () => <Icon name="close" fill={theme['color-danger-700']} height="30" width="30" />;
    return <Button
        size="tiny"
        status={isEditorOpen ? 'danger' : 'basic'}
        appearance="outline"
        accessoryLeft={isEditorOpen ? Close : Open}
        style={{ flexDirection: 'column', borderWidth: 0 }}
        onPress={() => {
            if (!isEditorOpen) vimo.createDraft()
            if (Keyboard.isVisible()) {
                Keyboard.dismiss()
                setTimeout(() => {
                    if (!Keyboard.isVisible()) isEditorOpen ? navigation.navigate('BottomNav', { screen: 'Home' }) : navigation.navigate('BookEditor')
                }, 100)
            } else isEditorOpen ? navigation.navigate('BottomNav', { screen: 'Home' }) : navigation.navigate('BookEditor')
        }}
    >{isEditorOpen ? 'Cerrar' : 'Nuevo'}
    </Button>
}