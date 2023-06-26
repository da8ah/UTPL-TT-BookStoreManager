import { useNavigation } from "@react-navigation/native";
import { Button, Icon, useTheme } from "@ui-kitten/components";
import { useContext } from "react";
import { EditorContext } from "../../hooks/context/EditorContext";
import { RootNavProps } from "../screens/screen";

export default function BookEditorToggle() {
    const { isEditorOpen, toggleEditor } = useContext(EditorContext)
    const navigation = useNavigation<RootNavProps>()
    const theme = useTheme()

    const Open = () => <Icon name="plus" fill="white" height="30" width="30" />;
    const Close = () => <Icon name="close" fill="white" height="30" width="30" />;
    return <Button
        accessoryLeft={isEditorOpen ? Close : Open}
        style={{ flexDirection: 'column', backgroundColor: isEditorOpen ? theme['color-danger-700'] : 'transparent', borderWidth: 0 }}
        onPress={() => {
            toggleEditor()
            navigation.navigate(isEditorOpen ? 'BottomNav' : 'BookEditor')
        }}
        size="tiny">{isEditorOpen ? 'Cerrar' : 'Nuevo'}
    </Button>
}