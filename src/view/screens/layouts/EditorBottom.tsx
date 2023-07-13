import { useNavigation } from "@react-navigation/native"
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
import { RootNavProps } from "../../routes/types.nav"
import { globalStyles as styles } from "../../styles/styles"
import AlertFactory, { AlertAttributes } from "./AlertFactory"
import ConfirmationFactory, { ConfirmationAttributes } from "./ConfirmationFactory"
import StockBook from "../../../model/core/entities/StockBook"

export default function EditorBottom(props: {
    bookISBN?: string
    isEditorDisabled: boolean
    resetBook: (book: StockBook) => any,
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

    const theme = useTheme()
    const [isKeyboardVisible] = useKeyboard()
    const navigation = useNavigation<RootNavProps>()

    const { vimo } = useAppViewModel()
    const [confirmationAttrs, setConfirmationAttrs, confirmationVisibility, setConfirmationVisibility] = useModal<ConfirmationAttributes>()
    const [alertAttrs, setAlertAttrs, alertVisibility, setAlertVisibility] = useModal<AlertAttributes>()

    // If one Modal is Open close the other
    useEffect(() => { if (confirmationVisibility) setAlertVisibility(false) }, [confirmationVisibility])
    useEffect(() => { if (alertVisibility) setConfirmationVisibility(false) }, [alertVisibility])

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
                props.bookISBN && vimo.createDraftByISBN(props.bookISBN)
                props.resetBook(vimo.getDraft())
                props.toggleDisabledState(true)
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
            onPress: () => {
                props.bookISBN && setConfirmationAttrs({ modalType: "update" })
                setConfirmationVisibility(true)
            }
        },
    ]

    const saveFlow = async () => {
        // Pre save
        if (!InputValidator.validateStockBook(vimo.getDraft())) {
            setAlertAttrs({ modalType: "failed", data: { title: 'Error en los datos', iconName: 'alert-triangle-outline', message: 'Compruebe los datos incorrectos' } })
            setAlertVisibility(true)
            return
        }

        // Save
        const result = await vimo.saveBook()
        if (result === undefined) {
            setAlertAttrs({ modalType: "failed", data: { title: 'La operación falló', message: 'Servicio no cargado, intente reiniciar' } })
            setAlertVisibility(true)
            return
        }
        if (result.creado === undefined && result.duplicado === undefined) {
            setAlertAttrs({ modalType: "failed", data: { title: 'La operación falló', message: 'Error de comunicación con el Servidor' } })
            setAlertVisibility(true)
            return
        }
        if (result.duplicado) {
            setAlertAttrs({ modalType: "failed", data: { title: 'La operación falló', message: 'El registro ya se encuentra guardado' } })
            setAlertVisibility(true)
            return
        }
        if (!result.creado && !result.duplicado) {
            setAlertAttrs({ modalType: "failed", data: { title: 'La operación falló', message: 'Error en la petición al Servidor' } })
            setAlertVisibility(true)
            return
        }

        setAlertAttrs({ modalType: "success", data: { title: 'Registro Actualizado', message: 'Se redireccionará al Inicio' } })
        setAlertVisibility(true)
    }

    const updateFlow = async () => {
        // Pre update
        if (props.bookISBN === undefined) {
            setAlertAttrs({ modalType: "failed", data: { title: 'La operación falló', iconName: 'alert-triangle-outline', message: 'Libro no encontrado, intente reabrirlo' } })
            setAlertVisibility(true)
            return
        }
        if (!InputValidator.validateStockBook(vimo.getDraft())) {
            setAlertAttrs({ modalType: "failed", data: { title: 'Error en los datos', iconName: 'alert-triangle-outline', message: 'Compruebe los datos incorrectos' } })
            setAlertVisibility(true)
            return
        }

        // Update
        const result = props.bookISBN && await vimo.updateBook(props.bookISBN)
        if (result === undefined) {
            setAlertAttrs({ modalType: "failed", data: { title: 'La operación falló', message: 'Servicio no cargado, intente reiniciar' } })
            setAlertVisibility(true)
            return
        }
        if (!result) {
            setAlertAttrs({ modalType: "failed", data: { title: 'La operación falló', message: 'El registro no pudo ser actualizado' } })
            setAlertVisibility(true)
            return
        }

        setAlertAttrs({ modalType: "success", data: { title: 'Registro Actualizado', message: 'Se redireccionará al Inicio' } })
        setAlertVisibility(true)
    }

    const deleteFlow = async () => {
        // Pre delete
        if (props.bookISBN === undefined) {
            setAlertAttrs({ modalType: "failed", data: { title: 'La operación falló', iconName: 'alert-triangle-outline', message: 'Libro no encontrado, intente reabrirlo' } })
            setAlertVisibility(true)
            return
        }

        // Delete
        const result = props.bookISBN && await vimo.deleteBook(props.bookISBN)
        if (result === undefined) {
            setAlertAttrs({ modalType: "failed", data: { title: 'La operación falló', message: 'Servicio no cargado, intente reiniciar' } })
            setAlertVisibility(true)
            return
        }
        if (!result) {
            setAlertAttrs({ modalType: "failed", data: { title: 'La operación falló', message: 'El registro no pudo ser eliminado' } })
            setAlertVisibility(true)
            return
        }

        setAlertAttrs({ modalType: "success", data: { title: 'Registro Eliminado', message: 'Se redireccionará al Inicio' } })
        setAlertVisibility(true)
    }

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
                        setConfirmationVisibility(false)
                        if (confirmationAttrs.modalType === "save") await saveFlow()
                        if (confirmationAttrs.modalType === "update") await updateFlow()
                        if (confirmationAttrs.modalType === "delete") await deleteFlow()
                    }}
                />
                : alertAttrs && <AlertFactory
                    {...alertAttrs}
                    onButtonPress={() => {
                        setAlertVisibility(false)
                        if (alertAttrs.modalType === "success") {
                            vimo.forceBooksUpdate()
                            navigation.navigate('BottomNav', { screen: 'Home' })
                        }
                    }}
                />
            }
        </ModalDisplay>
    </View>
}