import { Button, Input, Modal, ModalProps, Text } from "@ui-kitten/components";
import { useState } from "react";
import { Keyboard } from "react-native";
import { View } from "react-native";
import { globalStyles as styles } from "../styles/styles";

type ModalType = 'grossPricePerUnit' | 'stock'
export type ModalAttributes = {
    modalType?: ModalType
    data?: number
    onButtonPress?: (...args: any) => any
}
type ModalDisplayProps = ModalProps & ModalAttributes

export default function ModalDisplay(props: ModalDisplayProps) {
    return <Modal
        {...props}
        visible={props.visible || false}
        style={{ width: "70%" }}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        children={props.modalType && modalFactory(props)}
    />
}

function modalFactory(props: ModalAttributes) {
    switch (props.modalType) {
        case 'grossPricePerUnit':
            return <ModalPrice grossPricePerUnit={props.data && props.data || 0} onButtonPress={props.onButtonPress} />
        case 'stock':
            return <ModalStock stock={props.data && props.data || 0} onButtonPress={props.onButtonPress} />
    }
}

const ModalPrice = (props: {
    grossPricePerUnit: number,
    onButtonPress?: (...args: any) => any,
}) => {
    const [parteEntera, setParteEntera] = useState(props.grossPricePerUnit.toFixed(2).split(".")[0]);
    const [parteDecimal, setParteDecimal] = useState(props.grossPricePerUnit.toFixed(2).split(".")[1]);

    return (
        <View style={[styles.common, { backgroundColor: 'white', padding: 10, borderRadius: 20 }]}>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ color: 'black' }}>Precio $</Text>
                <Text style={{ color: 'black' }}>{parteEntera}.{parteDecimal}</Text>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 20 }}>
                <Input
                    selectTextOnFocus
                    keyboardType="phone-pad"
                    size="small"
                    textAlign="center"
                    cursorColor='black'
                    defaultValue={parteEntera}
                    value={parteEntera}
                    onChangeText={(newInt) => {
                        const regex = new RegExp(/^\d{0,3}$/);
                        if (!Number.isNaN(Number(newInt)) && regex.test(newInt)) setParteEntera(newInt);
                    }}
                />
                <Text style={{ textAlignVertical: "bottom" }}> . </Text>
                <Input
                    selectTextOnFocus
                    keyboardType="phone-pad"
                    size="small"
                    textAlign="center"
                    cursorColor='black'
                    defaultValue={parteDecimal}
                    value={parteDecimal}
                    onChangeText={(newFloat) => {
                        const regex = new RegExp(/^\d{0,2}$/);
                        if (!Number.isNaN(Number(newFloat)) && regex.test(newFloat)) setParteDecimal(newFloat);
                    }}
                />
            </View>
            <Button
                size="small"
                style={{ width: "50%" }}
                onPressIn={() => { if (Keyboard.isVisible()) Keyboard.dismiss() }}
                onPress={() => props.onButtonPress && grossPricePerUnitHandler(parteEntera, parteDecimal, props.onButtonPress)}
            >
                Confirmar
            </Button>
        </View>
    );
};
const ModalStock = (props: {
    stock: number,
    onButtonPress?: (...args: any) => any,
}) => {
    const [cant, setCant] = useState(props.stock.toFixed());

    return (
        <View style={{ alignItems: "center", padding: 20, borderRadius: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ textAlign: "right" }}>Cantidad de Artículos</Text>
                <Text style={{ width: "20%", textAlign: "center" }}>{Number(cant) !== 0 ? cant : "0"}</Text>
            </View>
            <View style={{ marginVertical: 20 }}>
                <Input
                    selectTextOnFocus
                    keyboardType="phone-pad"
                    size="small"
                    textAlign="center"
                    cursorColor='black'
                    defaultValue={cant}
                    value={cant}
                    onChangeText={(newCant) => {
                        const regex = new RegExp(/^\d{0,4}$/);
                        if (!Number.isNaN(Number(newCant)) && regex.test(newCant)) setCant(newCant);
                    }}
                />
            </View>
            <Button
                size="small"
                style={{ width: "50%" }}
                onPressIn={() => { if (Keyboard.isVisible()) Keyboard.dismiss() }}
                onPress={() => props.onButtonPress && stockHandler(cant, props.onButtonPress)}
            >
                Confirmar
            </Button>
        </View>
    );
};


function grossPricePerUnitHandler(parteEntera: string, parteDecimal: string, callback: (grossPricePerUnit: number) => void) {
    const grossPricePerUnit = Number(`${parteEntera}.${parteDecimal}`);
    if (!Number.isNaN(grossPricePerUnit)) callback(grossPricePerUnit)
}
const stockHandler = (cant: string, callback: (grossPricePerUnit: number) => void) => {
    const stock = Number(cant);
    if (!Number.isNaN(stock)) callback(stock)
}