import { useNavigation } from "@react-navigation/native";
import { Button, Icon, useTheme } from "@ui-kitten/components";
import { useContext } from "react";
import { EditorContext } from "../../hooks/context/EditorContext";
import { RootNavProps } from "../screens/screen";

export default function BookEditorToggle() {
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
            navigation.navigate(isEditorOpen ? 'BottomNav' : 'BookEditor')
        }}
    >{isEditorOpen ? 'Cerrar' : 'Nuevo'}
    </Button>
}