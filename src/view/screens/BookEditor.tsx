import { Icon, Text, Toggle, useTheme } from "@ui-kitten/components";
import { useContext, useEffect, useState } from "react";
import { Image, Keyboard, StyleSheet, View } from "react-native";
import { EditorContext } from "../../hooks/context/EditorContext";
import { ThemeContext } from "../../hooks/context/ThemeContext";
import useEditor from "../../hooks/useEditor";
import useKeyboard from "../../hooks/useKeyboard";
import ActionButton from "../components/ActionButton";
import BookInput from "../components/BookInput";
import DatePicker from "../components/DatePicker";
import ModalDisplay, { ModalAttributes } from "../components/ModalDisplay";
import StatusButton from "../components/StatusButton";
import StatusTouch from "../components/StatusTouch";
import { BookEditorRouteProps } from "../routes/types.nav";
import { globalStyles } from "../styles/styles";

const EditorTop = (props: { isEditorDisabled: boolean }) => {
    const [isKeyboardVisible] = useKeyboard()
    const { themeMode } = useContext(ThemeContext)
    const theme = useTheme()
    return <View style={[styles.common]}>
        <View
            style={[globalStyles.common, {
                display: isKeyboardVisible ? 'none' : 'flex',
                backgroundColor: themeMode === 'dark' ? 'transparent' : "gainsboro",
                flexDirection: "row",
                justifyContent: "space-around",
                borderRadius: 20,
                margin: 5

            }]}
        >
            <Text>Fecha de Lanzamiento: </Text>
            <DatePicker disabled={props.isEditorDisabled} />
        </View>
        <View style={{ flexDirection: "row" }}>
            <View style={[styles.topLeftPanel, { backgroundColor: theme['background-basic-color-2'], opacity: props.isEditorDisabled ? 0.5 : 1 }]}>
                <Image style={styles.image} source={require("@Assets/bookstore.png")} />
            </View>
            <View style={[styles.common, styles.topRightPanel]}>
                <View style={styles.inputLayout}>
                    <BookInput disabled={props.isEditorDisabled} title={"Título"} />
                </View>
                <View style={styles.inputLayout}>
                    <BookInput disabled={props.isEditorDisabled} title={"ISBN"} />
                </View>
                <View style={styles.inputLayout}>
                    <BookInput disabled={props.isEditorDisabled} title={"Autor"} />
                </View>
            </View>
        </View>
    </View>
}

const EditorMiddle = (props: { isEditorDisabled: boolean, setModalAttributes: (modalAttributes: ModalAttributes) => any, data: { price: number } }) => {
    const [isKeyboardVisible] = useKeyboard()
    const { themeMode } = useContext(ThemeContext)
    const ClockIcon = <Icon name="clock-outline" fill={"tomato"} height="35" width="35" />
    // {/* <Icon name="clock-outline" fill={recent ? "tomato" : "darkgray"} height="35" width="35" /> */}
    // {/* <Icon name="clock" fill={recent ? "tomato" : "darkgray"} height="35" width="35" /> */}
    const StarIcon = <Icon name="star-outline" fill={"gold"} height="35" width="35" />
    // {/* <Icon name="star-outline" fill={bestSeller ? "gold" : "darkgray"} height="35" width="35" /> */}
    // {/* <Icon name="star" fill={bestSeller ? "gold" : "darkgray"} height="35" width="35" /> */}
    const CheckIcon = <Icon name="checkmark-circle-2-outline" fill={"greenyellow"} height="35" width="35" />
    // {/* <Icon name="checkmark-circle-2-outline" fill={recommended ? "greenyellow" : "darkgray"} height="35" width="35" /> */}
    // {/* <Icon name="checkmark-circle-2" fill={recommended ? "greenyellow" : "darkgray"} height="35" width="35" /> */}
    const EyeIcon = <Icon name={"eye-outline"} fill={"turquoise"} height="35" width="35" />
    // <Icon name={visible ? "eye-outline" : "eye-off-outline"} fill={visible ? "turquoise" : "darkgray"} height="35" width="35" />
    // <Icon name={visible ? "eye" : "eye-off"} fill={visible ? "turquoise" : "darkgray"} height="35" width="35" />

    return <>{
        isKeyboardVisible ? <></> :
            <View style={[styles.common, styles.bodyMiddle]}>
                <View
                    style={{
                        flex: 2,
                        backgroundColor: transparent,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 5,
                        padding: 5,
                        borderRadius: 5,
                    }}
                >
                    <View style={{ width: "10%" }} />
                    <View style={{ width: "70%", flexDirection: "row", justifyContent: "space-around" }}>
                        <StatusTouch disabled={props.isEditorDisabled} title="Reciente" icon={ClockIcon} height={40} width={40} activeOpacity={1} backgroundColor={'transparent'} />
                        <StatusTouch disabled={props.isEditorDisabled} title="Más vendido" icon={StarIcon} height={40} width={40} activeOpacity={1} backgroundColor={'transparent'} />
                        <StatusTouch disabled={props.isEditorDisabled} title="Recomendado" icon={CheckIcon} height={40} width={40} activeOpacity={1} backgroundColor={'transparent'} />
                    </View>
                    <View style={{ width: "10%", justifyContent: "center", alignItems: "flex-end" }}>
                        <StatusTouch disabled={props.isEditorDisabled} icon={EyeIcon} height={40} width={40} activeOpacity={1} backgroundColor={'transparent'} />
                    </View>
                </View>
                <View style={{ flex: 4, flexDirection: "row" }}>
                    <View
                        style={{
                            backgroundColor: transparent,
                            width: "70%",
                            height: '100%',
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                        }}
                    >
                        <View style={{ width: "30%", height: "100%", justifyContent: "space-around" }}>
                            <Toggle disabled={props.isEditorDisabled} />
                            <Toggle disabled={props.isEditorDisabled} />
                        </View>
                        <View style={{ width: "30%", height: "100%", justifyContent: "space-around" }}>
                            <Text>Descuento</Text>
                            <Text>IVA</Text>
                        </View>
                        <View style={{ width: "30%", height: "100%", justifyContent: "space-around", alignItems: "flex-start" }}>
                            <StatusButton disabled={props.isEditorDisabled} textLeft captionText={'% '} captionFontColor={themeMode === 'dark' ? 'white' : "black"}>25</StatusButton>
                            <StatusButton disabled={props.isEditorDisabled} textLeft captionText={'% '} status="danger" captionFontColor={themeMode === 'dark' ? 'white' : "black"}>12</StatusButton>
                        </View>
                    </View>
                    <View style={{ width: "30%", height: '100%', justifyContent: "space-around", alignItems: "flex-end" }}>
                        <StatusButton
                            disabled={props.isEditorDisabled}
                            justifyToEnd
                            captionText={'💲'}
                            captionFontSize={25}
                            onPress={() => props.setModalAttributes({ modalType: 'price', data: props.data.price })}
                        >{props.data.price.toString()}</StatusButton>
                        <StatusButton disabled={props.isEditorDisabled} justifyToEnd captionText={' 📦'} captionFontSize={20}>100</StatusButton>
                    </View>
                </View>
            </View>
    }
    </>
}

const EditorBottom = (props: { isNew: boolean, isEditorDisabled: boolean, toggleDisabledState: (state: boolean) => void }) => {
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
            onPress: () => props.toggleDisabledState(true)
        },
        {
            disabled: props.isEditorDisabled,
            width: 70,
            iconName: "trash-2",
            backgroundColor: theme['color-danger-500']
        },
        {
            disabled: props.isEditorDisabled,
            width: 90,
            iconName: "save",
            backgroundColor: theme['color-success-500']
        },
    ]
    return <View style={[styles.common, styles.bodyBottom]}>
        <View>
            <BookInput disabled={props.isEditorDisabled} textarea title="Descripción" />
        </View>
        {/* <Modal
            visible={modalVisibility}
            style={{ width: "70%" }}
            backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onBackdropPress={() => setModalVisibility(false)}
            children={modalChildren}
        /> */}

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
        <View style={{ display: isKeyboardVisible ? 'none' : 'flex' }}>
            <Text style={{ fontSize: 10, fontStyle: "italic", textAlign: "right" }}>{`(Fecha de creación del registro: ${Intl.DateTimeFormat("ec", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }).format(new Date())})`}</Text>
        </View>
    </View>
}

export default function BookEditor({ route }: { route: BookEditorRouteProps }) {
    const bookIndex = route.params?.bookIndex
    const { isEditorOpen, toggleEditor } = useContext(EditorContext)
    const theme = useTheme()
    const [isEditorDisabled, toggleDisabledState] = useEditor()
    const [modalAttributes, setModalAttributes] = useState<ModalAttributes>()
    const [modalVisibility, setModalVisibility] = useState(false);

    const [price, setPrice] = useState(25)

    useEffect(() => {
        toggleEditor(true)
        route.params && console.log(bookIndex)
        toggleDisabledState(bookIndex !== undefined)
        return () => { toggleEditor(false) }
    }, [])

    useEffect(() => {
        setModalVisibility(modalAttributes !== undefined)
    }, [modalAttributes])

    return <View pointerEvents={isEditorOpen ? 'auto' : 'none'} style={[globalStyles.common, globalStyles.body, { backgroundColor: theme['background-basic-color-3'] }]}>
        <ModalDisplay
            visible={modalVisibility}
            onBackdropPress={() => { if (Keyboard.isVisible()) Keyboard.dismiss(); setModalVisibility(false) }}
            modalType={modalAttributes?.modalType} data={modalAttributes?.data}
            onButtonPress={({ parteEntera, parteDecimal }) => {
                const price = Number(`${parteEntera}.${parteDecimal}`);
                if (!Number.isNaN(price)) {
                    setPrice(price)
                    setModalVisibility(false)
                }
            }}
        />
        <EditorTop isEditorDisabled={isEditorDisabled} />
        <EditorMiddle isEditorDisabled={isEditorDisabled} setModalAttributes={setModalAttributes} data={{ price }} />
        <EditorBottom isNew={bookIndex === undefined} isEditorDisabled={isEditorDisabled} toggleDisabledState={toggleDisabledState} />
    </View>
}


const transparent = "transparent";
const styles = StyleSheet.create({
    common: {
        width: "100%",
        justifyContent: "center",
        textAlign: "center",
    },
    container: { flex: 1, paddingTop: 10 },
    header: {
        backgroundColor: "black",
        zIndex: 0,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        color: "white",
    },
    body: { flex: 9, width: "100%" },
    bodyTop: { zIndex: 1, flex: 6, backgroundColor: transparent, padding: 5 },
    bodyMiddle: { zIndex: 0, flex: 3, backgroundColor: transparent, padding: 5 },
    bodyBottom: { zIndex: 1, flex: 5, backgroundColor: transparent, justifyContent: "space-around", padding: 5 },
    topLeftPanel: {
        width: "35%",
        height: 250,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginHorizontal: 5,
    },
    topRightPanel: { backgroundColor: transparent, width: "60%", height: 250, justifyContent: "space-around" },
    inputLayout: { justifyContent: "center" },
    image: {
        maxWidth: "80%",
        maxHeight: 120,
        resizeMode: "contain",
    },
});