import { Icon, Text, Toggle, useTheme } from "@ui-kitten/components";
import { useContext, useEffect, useState } from "react";
import { Image, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { EditorContext } from "../../hooks/context/EditorContext";
import ActionButton from "../components/ActionButton";
import BookInput from "../components/BookInput";
import DatePicker from "../components/DatePicker";
import StatusButton from "../components/StatusButton";
import StatusTouch from "../components/StatusTouch";
import { globalStyles } from "../styles/styles";
import { RootNavProps } from "./screen";

const EditorTop = (props: { setInputFocusState: any }) => {
    return <View style={[styles.common]}>
        <View
            style={[globalStyles.common, {
                flexDirection: "row",
                justifyContent: "space-around"
            }]}
        >
            <Text>Fecha de Lanzamiento: </Text>
            <DatePicker />
        </View>
        <View style={{ flexDirection: "row" }}>
            <View style={styles.topLeftPanel}>
                <Image style={styles.image} source={require("@Assets/bookstore.png")} />
            </View>
            <View style={[styles.common, styles.topRightPanel]}>
                <View style={styles.inputLayout}>
                    <BookInput title={"Título"} onFocus={() => props.setInputFocusState(true)} />
                </View>
                <View style={styles.inputLayout}>
                    <BookInput title={"ISBN"} onFocus={() => props.setInputFocusState(true)} />
                </View>
                <View style={styles.inputLayout}>
                    <BookInput title={"Autor"} onFocus={() => props.setInputFocusState(true)} />
                </View>
            </View>
        </View>
    </View>
}

const EditorMiddle = (props: { isInputFocused: boolean }) => {
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
        props.isInputFocused ? <></> :
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
                        <StatusTouch title="Reciente" icon={ClockIcon
                        } height={40} width={40} activeOpacity={1} backgroundColor={'transparent'} />
                        <StatusTouch title="Más vendido" icon={StarIcon} height={40} width={40} activeOpacity={1} backgroundColor={'transparent'} />
                        <StatusTouch title="Recomendado" icon={CheckIcon} height={40} width={40} activeOpacity={1} backgroundColor={'transparent'} />
                    </View>
                    <View style={{ width: "10%", justifyContent: "center", alignItems: "flex-end" }}>
                        <StatusTouch icon={EyeIcon} height={40} width={40} activeOpacity={1} backgroundColor={'transparent'} />
                    </View>
                </View>
                {/* <Modal
            visible={modalVisibility}
            style={{ width: "70%" }}
            backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onBackdropPress={() => setModalVisibility(false)}
            children={modalChildren}
        /> */}
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
                            <Toggle />
                            <Toggle />
                        </View>
                        <View style={{ width: "30%", height: "100%", justifyContent: "space-around" }}>
                            <Text>Descuento</Text>
                            <Text>IVA</Text>
                        </View>
                        <View style={{ width: "30%", height: "100%", justifyContent: "space-around", alignItems: "flex-start" }}>
                            <StatusButton textLeft captionText={'% '}>25</StatusButton>
                            <StatusButton textLeft captionText={'% '} status="danger">12</StatusButton>
                        </View>
                    </View>
                    <View style={{ width: "30%", height: '100%', justifyContent: "space-around", alignItems: "flex-end" }}>
                        <StatusButton captionText={' 💲'}>25</StatusButton>
                        <StatusButton captionText={' 📦'}>100</StatusButton>
                    </View>
                </View>
            </View>
    }
    </>
}

const EditorBottom = (props: { setInputFocusState: any }) => {
    const theme = useTheme()
    return <View style={[styles.common, styles.bodyBottom]}>
        <View>
            <BookInput textarea title="Descripción" onFocus={() => props.setInputFocusState(true)} />
        </View>
        {/* <Modal
            visible={modalVisibility}
            style={{ width: "70%" }}
            backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onBackdropPress={() => setModalVisibility(false)}
            children={modalChildren}
        /> */}
        <View style={[styles.common, { justifyContent: "space-around", alignItems: "center" }]}>
            <ActionButton
                icon={SaveIcon}
                backgroundColor={theme['color-success-500']}
            />
        </View>
        <View>
            <Text style={{ fontSize: 10, fontStyle: "italic", textAlign: "right" }}>{`(Fecha de creación del registro: ${Intl.DateTimeFormat("ec", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }).format(new Date())})`}</Text>
        </View>
    </View>
}
const SaveIcon = () => <Icon name="save" fill="white" height="30" width="30" />;


export default function BookEditor({ route }: { route?: RootNavProps }) {
    const { toggleEditor } = useContext(EditorContext)
    const theme = useTheme()

    useEffect(() => {
        toggleEditor(true)
        route.params && console.log(route.params.bookIndex);
        return () => { toggleEditor(false); }
    }, [])


    const [isInputFocused, setInputFocusState] = useState(false)
    // const starHandler = () => {
    //     setStar(star => !star)
    //     Keyboard.dismiss()
    //     inputRef.current!.blur()
    // }

    return <TouchableWithoutFeedback
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
        onPress={() => { setInputFocusState(false); Keyboard.dismiss(); return !Keyboard.isVisible(); }}
    >
        <View style={[globalStyles.common, { flex: 1, backgroundColor: theme['background-basic-color-3'] }]}>

            <EditorTop setInputFocusState={setInputFocusState} />
            <EditorMiddle isInputFocused={isInputFocused} />
            <EditorBottom setInputFocusState={setInputFocusState} />
        </View>
    </TouchableWithoutFeedback>
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
        backgroundColor: "gainsboro",
        width: "35%",
        height: 250,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginHorizontal: 5,
    },
    topRightPanel: { backgroundColor: transparent, width: "60%", height: 250, justifyContent: "space-around" },
    inputLayout: { justifyContent: "center" },
    inputTitle: {
        backgroundColor: "darkgrey",
        width: "30%",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    input: {
        width: "100%",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
        borderBottomWidth: 2,
        borderColor: "darkgrey",
    },
    image: {
        maxWidth: "80%",
        maxHeight: 120,
        resizeMode: "contain",
    },
});