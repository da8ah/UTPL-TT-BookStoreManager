import { Button, Input, Modal, ModalProps, Text } from "@ui-kitten/components";
import { useState } from "react";
import { View } from "react-native";

type ModalType = 'price' | 'stock'
export type ModalAttributes = {
    modalType?: ModalType
    data?: number
    onPress?: ({ ...args }) => any
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
        case 'price':
            return <ModalPrice grossPricePerUnit={props.data && props.data || 0} onPress={props.onPress} />
        case 'stock':
            return <ModalStock stock={props.data && props.data || 0} />
    }
}

const ModalPrice = (props: {
    grossPricePerUnit: number;
    onPress?: ({ parteEntera, parteDecimal }: { parteEntera: string, parteDecimal: string }) => any
}) => {
    const [parteEntera, setParteEntera] = useState(props.grossPricePerUnit.toFixed(2).split(".")[0]);
    const [parteDecimal, setParteDecimal] = useState(props.grossPricePerUnit.toFixed(2).split(".")[1]);

    return (
        <View style={{ backgroundColor: 'white', alignItems: "center", padding: 20, borderRadius: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ width: "25%", textAlign: "right", color: 'black' }}>Precio $</Text>
                <Text style={{ width: "20%", textAlign: "right", color: 'black' }}>
                    {parteEntera}.{parteDecimal}
                </Text>
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
                onPress={() => props.onPress && props.onPress({ parteEntera, parteDecimal })}
            >
                Confirmar
            </Button>
        </View>
    );
};
const ModalStock = (props: {
    stock: number;
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
                onPress={() => {
                    const parse = Number(cant);
                    if (!Number.isNaN(parse)) console.log(parse)
                }}
            >
                Confirmar
            </Button>
        </View>
    );
};