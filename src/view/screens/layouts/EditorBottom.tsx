import { Icon, Text, useTheme } from "@ui-kitten/components"
import { useEffect } from "react"
import { Keyboard, View } from "react-native"
import useAppViewModel from "../../../hooks/context/useAppViewModel"
import useKeyboard from "../../../hooks/useKeyboard"
import useModal from "../../../hooks/useModal"
import { InputValidator } from "../../../utils/validations"
import ActionButton from "../../components/ActionButton"
import BookInput from "../../components/BookInput"
import ModalDisplay from "../../components/ModalDisplay"
import { globalStyles as styles } from "../../styles/styles"
import AlertFactory, { AlertAttributes } from "./AlertFactory"
import ConfirmationFactory, { ConfirmationAttributes } from "./ConfirmationFactory"

export default function EditorBottom(props: {
    bookISBN?: string
    isEditorDisabled: boolean
    toggleDisabledState: (state: boolean) => void
    data: {
        createdDate: string,
        description: string
        setBasicProperty: (propName: string, value: string) => void
    }
}) {

    const isNew = props.bookISBN === undefined
    const {
        createdDate,
        description,
        setBasicProperty
    } = props.data

    const { vimo } = useAppViewModel()
    const [confirmationAttrs, setConfirmationAttrs, confirmationVisibility, setConfirmationVisibility] = useModal<ConfirmationAttributes>()
    const [alertAttrs, setAlertAttrs, alertVisibility, setAlertVisibility] = useModal<AlertAttributes>()
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
            onPress: () => {
                props.toggleDisabledState(true)
                //props.bookISBN && vimo.createDraftByISBN(props.bookISBN)
            }
        },
        {
            disabled: props.isEditorDisabled,
            width: 70,
            iconName: "trash-2",
            backgroundColor: theme['color-danger-500'],
            onPress: () => {
                props.bookISBN && setConfirmationAttrs({ modalType: "delete" })
                setConfirmationVisibility(true)
            }
        },
        {
            disabled: props.isEditorDisabled,
            width: 90,
            iconName: "save",
            backgroundColor: theme['color-success-500'],
            onPress: () => console.log(props.bookISBN)//props.bookISBN && vimo.updateBook(props.bookISBN)
        },
    ]

    // If one Modal is Open close the other
    useEffect(() => { if (confirmationVisibility) setAlertVisibility(false) }, [confirmationVisibility])
    useEffect(() => { if (alertVisibility) setConfirmationVisibility(false) }, [alertVisibility])

    return <View style={[styles.common, { zIndex: 1, flex: 5, padding: 5, backgroundColor: 'transparent', justifyContent: "space-around", alignItems: 'stretch' }]}>
        <View>
            <BookInput disabled={props.isEditorDisabled} textarea title="Descripción" defaultValue={description} onChangeText={input => setBasicProperty('description', input)} />
        </View>
        <View style={[styles.common, { flexDirection: 'row', justifyContent: 'space-evenly' }]}>
            {isNew ?
                <ActionButton
                    icon={() => <Icon name="save" fill="white" height="30" width="30" />}
                    backgroundColor={theme['color-success-500']}
                    onPress={() => {
                        setConfirmationAttrs({ modalType: "save" })
                        setConfirmationVisibility(true)
                    }}
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
            <Text style={{ fontSize: 10, fontStyle: "italic", textAlign: "right" }}>{`(Fecha de creación del registro: ${isNew ?
                Intl.DateTimeFormat("ec", {
                    day: "2-digit", month: "2-digit", year: "numeric",
                }).format(new Date())
                : createdDate})`}</Text>
        </View>
        <ModalDisplay
            visible={confirmationVisibility || alertVisibility}
            onBackdropPress={() => { if (Keyboard.isVisible()) Keyboard.dismiss(); setConfirmationVisibility(false); setAlertVisibility(false) }}
        >
            {confirmationVisibility && !alertVisibility ?
                confirmationAttrs && <ConfirmationFactory
                    {...confirmationAttrs}
                    onButtonPress={async () => {
                        if (confirmationAttrs.modalType === "save") {
                            if (!InputValidator.validateStockBook(vimo.getDraft())) {
                                setAlertAttrs({ modalType: "failed", data: { title: 'La operación falló', message: 'Compruebe los datos incorrectos' } })
                                setAlertVisibility(true)
                                return
                            }

                            const result = await vimo.saveBook()
                            if (result === undefined) {
                                setAlertAttrs({ modalType: "failed", data: { title: 'La operación falló', message: 'Servicio no cargado, intente reiniciar' } })
                                setAlertVisibility(true)
                                return
                            }
                            if (result.creado === undefined && result.duplicado === undefined) {
                                setAlertAttrs({ modalType: "failed", data: { title: 'La operación falló', message: 'Error en la petición al Servidor' } })
                                setAlertVisibility(true)
                                return
                            }
                            if (result.duplicado) {
                                setAlertAttrs({ modalType: "failed", data: { title: 'La operación falló', message: 'El registro está duplicado' } })
                                setAlertVisibility(true)
                                return
                            }
                            if (!(result.creado && result.duplicado)) {
                                setAlertAttrs({ modalType: "failed", data: { title: 'La operación falló', message: 'El Servidor no pudo guardar el registro' } })
                                setAlertVisibility(true)
                                return
                            }
                            if (result.creado && !result.duplicado) {
                                setAlertAttrs({ modalType: "success", data: { title: 'Registro Actualizado', message: 'Se redireccionará al Inicio' } })
                                setAlertVisibility(true)
                                return
                            }
                        }

                        if (confirmationAttrs.modalType === "update") {

                        }
                        if (confirmationAttrs.modalType === "delete") {
                            // setAlertAttrs({ modalType: "failed", data: { message: 'El registro no pudo ser eliminado'} })
                            // setAlertVisibility(true)
                            //await vimo.deleteBook(props.bookISBN)
                        }

                        setConfirmationVisibility(false)
                    }}
                />
                : alertAttrs && <AlertFactory
                    {...alertAttrs}
                    onButtonPress={() => {
                        setAlertVisibility(false)
                    }}
                />
            }
        </ModalDisplay>
    </View>
}