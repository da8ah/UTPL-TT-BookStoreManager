import { Icon, Text, Toggle } from "@ui-kitten/components"
import { useContext } from "react"
import { View } from "react-native"
import { ThemeContext } from "../../../hooks/context/ThemeContext"
import useKeyboard from "../../../hooks/useKeyboard"
import StatusButton from "../../components/StatusButton"
import StatusTouch from "../../components/StatusTouch"
import { globalStyles as styles } from "../../styles/styles"
import { DraftModalAttributes } from "./ModalBookFactory"

const transparent = "transparent";

export default function EditorStatus(props: {
    isEditorDisabled: boolean, setModalAttributes: (modalAttributes: DraftModalAttributes) => any,
    data: {
        grossPricePerUnit: number,
        inOffer: boolean,
        discountPercentage: number,
        hasIva: boolean,
        ivaPercentage: number,
        stock: number,
        visible: boolean,
        recommended: boolean,
        bestSeller: boolean,
        recent: boolean,
        setStatusProperty: (propName: string, value: number | boolean) => void
    }
}) {
    const {
        grossPricePerUnit,
        inOffer,
        discountPercentage,
        hasIva,
        ivaPercentage,
        stock,
        visible,
        recommended,
        bestSeller,
        recent,
        setStatusProperty
    } = props.data

    const [isKeyboardVisible] = useKeyboard()
    const { themeMode } = useContext(ThemeContext)
    const ClockIcon = <Icon name={!props.isEditorDisabled ? 'clock' : "clock-outline"} fill={recent ? "tomato" : 'darkgray'} height="35" width="35" />
    const StarIcon = <Icon name={!props.isEditorDisabled ? 'star' : "star-outline"} fill={bestSeller ? "gold" : 'darkgray'} height="35" width="35" />
    const CheckIcon = <Icon name={!props.isEditorDisabled ? 'checkmark-circle-2' : "checkmark-circle-2-outline"} fill={recommended ? "greenyellow" : 'darkgray'} height="35" width="35" />
    const EyeIcon = <Icon name={!props.isEditorDisabled ? visible ? 'eye' : "eye-off" : visible ? 'eye-outline' : "eye-off-outline"} fill={visible ? "turquoise" : 'darkgray'} height="40" width="40" />

    return <>{
        isKeyboardVisible ? <></> :
            <View style={[styles.common, { zIndex: 0, flex: 3, backgroundColor: transparent, padding: 5 }]}>
                <View
                    style={{
                        flex: 3,
                        backgroundColor: transparent,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 5,
                        borderRadius: 5,
                    }}
                >
                    <View style={{ width: "10%" }} />
                    <View style={{ width: "70%", flexDirection: "row", justifyContent: "space-around" }}>
                        <View style={{ width: '30%' }}>
                            <StatusTouch disabled={props.isEditorDisabled} title="Reciente" icon={ClockIcon} height={40} width={40}
                                onPress={() => setStatusProperty('recent', !recent)}
                            />

                        </View>
                        <View style={{ width: '30%' }}>
                            <StatusTouch disabled={props.isEditorDisabled} title="Más vendido" icon={StarIcon} height={40} width={40}
                                onPress={() => setStatusProperty('bestSeller', !bestSeller)}
                            />
                        </View>
                        <View style={{ width: '30%' }}>
                            <StatusTouch disabled={props.isEditorDisabled} title="Recomendado" icon={CheckIcon} height={40} width={40}
                                onPress={() => setStatusProperty('recommended', !recommended)}
                            />
                        </View>
                    </View>
                    <View style={{ width: "10%", justifyContent: "center", alignItems: "flex-end" }}>
                        <StatusTouch disabled={props.isEditorDisabled} icon={EyeIcon} height={45} width={45}
                            onPress={() => setStatusProperty('visible', !visible)}
                        />
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
                            <Toggle disabled={props.isEditorDisabled} checked={inOffer}
                                onChange={() => setStatusProperty('inOffer', !inOffer)}
                            />
                            <Toggle disabled={props.isEditorDisabled} checked={hasIva} status={hasIva ? "danger" : 'basic'}
                                onChange={() => setStatusProperty('hasIva', !hasIva)}
                            />
                        </View>
                        <View style={{ width: "30%", height: "100%", justifyContent: "space-around" }}>
                            <Text>Descuento</Text>
                            <Text>IVA</Text>
                        </View>
                        <View style={{ width: "30%", height: "100%", justifyContent: "space-around", alignItems: "flex-start" }}>
                            <StatusButton
                                disabled={props.isEditorDisabled}
                                textLeft
                                captionText={'% '}
                                appearance={inOffer ? 'filled' : 'outline'}
                                status={inOffer ? "primary" : 'basic'}
                                captionFontColor={themeMode === 'dark' ? 'white' : "black"}
                                onPress={() => { props.setModalAttributes({ modalType: 'discountPercentage', data: { grossPricePerUnit, discountPercentage } }) }}
                            >{inOffer ? discountPercentage.toString() : '0'}</StatusButton>
                            <StatusButton
                                disabled={props.isEditorDisabled}
                                textLeft
                                captionText={'% '}
                                appearance={hasIva ? 'filled' : 'outline'}
                                status={hasIva ? "danger" : 'basic'}
                                captionFontColor={themeMode === 'dark' ? 'white' : "black"}
                                onPress={() => setStatusProperty('hasIva', !hasIva)}
                            >{ivaPercentage.toString()}</StatusButton>
                        </View>
                    </View>
                    <View style={{ width: "30%", height: '100%', justifyContent: "space-around", alignItems: "flex-end" }}>
                        <StatusButton
                            disabled={props.isEditorDisabled}
                            justifyToEnd
                            captionText={'💲'}
                            captionFontSize={24}
                            onPress={() => props.setModalAttributes({ modalType: "grossPricePerUnit", data: { grossPricePerUnit } })}
                        >{grossPricePerUnit % 1 !== 0 ? grossPricePerUnit.toFixed(2) : grossPricePerUnit.toString()}</StatusButton>
                        <StatusButton
                            disabled={props.isEditorDisabled}
                            justifyToEnd
                            captionText={' 📦'}
                            captionFontSize={20}
                            onPress={() => { props.setModalAttributes({ modalType: 'stock', data: { stock } }) }}
                        >{stock.toString()}</StatusButton>
                    </View>
                </View>
            </View >
    }
    </>
}