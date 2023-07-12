import { Icon, Text, useTheme } from "@ui-kitten/components"
import { View } from "react-native"
import useKeyboard from "../../../hooks/useKeyboard"
import ActionButton from "../../components/ActionButton"
import BookInput from "../../components/BookInput"
import { globalStyles as styles } from "../../styles/styles"
import useAppViewModel from "../../../hooks/context/useAppViewModel"

export default function EditorBottom(props: {
    isNew: boolean
    isEditorDisabled: boolean
    toggleDisabledState: (state: boolean) => void
    data: {
        createdDate: string,
        description: string
        setBasicProperty: (propName: string, value: string) => void
    }
}) {
    const {
        createdDate,
        description,
        setBasicProperty
    } = props.data

    const { vimo } = useAppViewModel()
    const [isKeyboardVisible] = useKeyboard()
    const theme = useTheme()
    const bottomButtons = [
        {
            disabled: !props.isEditorDisabled,
            width: 90,
            iconName: "edit",
            backgroundColor: theme['color-warning-500'],
            onPress: () => props.toggleDisabledState(false)
        },
        {
            disabled: props.isEditorDisabled,
            width: 70,
            iconName: "slash",
            backgroundColor: theme['color-warning-500'],
            onPress: () => { props.toggleDisabledState(true); console.log(vimo.getDraft()) }
        },
        {
            disabled: props.isEditorDisabled,
            width: 70,
            iconName: "trash-2",
            backgroundColor: theme['color-danger-500'],
            onPress: () => console.log(vimo.getDraft())
        },
        {
            disabled: props.isEditorDisabled,
            width: 90,
            iconName: "save",
            backgroundColor: theme['color-success-500'],
            onPress: () => console.log(vimo.getDraft())
        },
    ]
    return <View style={[styles.common, { zIndex: 1, flex: 5, padding: 5, backgroundColor: 'transparent', justifyContent: "space-around", alignItems: 'stretch' }]}>
        <View>
            <BookInput disabled={props.isEditorDisabled} textarea title="Descripción" defaultValue={description} onChangeText={input => setBasicProperty('description', input)} />
        </View>
        <View style={[styles.common, { flexDirection: 'row', justifyContent: 'space-evenly' }]}>
            {props.isNew ?
                <ActionButton
                    icon={() => <Icon name="save" fill="white" height="30" width="30" />}
                    backgroundColor={theme['color-success-500']}
                />
                :
                bottomButtons.map((button, index) => {
                    return <ActionButton key={`editor-action-button-${index}`}
                        disabled={button.disabled}
                        width={button.width}
                        icon={() => <Icon name={button.iconName} fill="white" height="30" width="30" />}
                        backgroundColor={button.backgroundColor}
                        onPress={button.onPress}
                    />
                })}
        </View>
        <View style={[styles.common, { display: isKeyboardVisible ? 'none' : 'flex', alignItems: 'flex-end' }]}>
            <Text style={{ fontSize: 10, fontStyle: "italic", textAlign: "right" }}>{`(Fecha de creación del registro: ${props.isNew ?
                Intl.DateTimeFormat("ec", {
                    day: "2-digit", month: "2-digit", year: "numeric",
                }).format(new Date())
                : createdDate})`}</Text>
        </View>
    </View>
}