import { Button, Input, Text } from "@ui-kitten/components";
import { useState } from "react";
import { Keyboard, View } from "react-native";
import { globalStyles as styles } from "../../styles/styles";
import { patterns } from "../../../utils/validations";

export default function ModalPrice(props: { grossPricePerUnit: number, onButtonPress: (grossPricePerUnit: number) => void }) {
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
                        const regex = new RegExp(patterns.ModalInputs.GROSS_PRICE_PER_UNIT_ENTERO);
                        if (!Number.isNaN(Number(newInt)) && regex.test(newInt)) setParteEntera(newInt);
                    }}
                />
                <Text style={{ color: 'black', textAlignVertical: "bottom" }}> . </Text>
                <Input
                    selectTextOnFocus
                    keyboardType="phone-pad"
                    size="small"
                    textAlign="center"
                    cursorColor='black'
                    defaultValue={parteDecimal}
                    value={parteDecimal}
                    onChangeText={(newFloat) => {
                        const regex = new RegExp(patterns.ModalInputs.GROSS_PRICE_PER_UNIT_DECIMAL);
                        if (!Number.isNaN(Number(newFloat)) && regex.test(newFloat)) setParteDecimal(newFloat);
                    }}
                />
            </View>
            <Button
                size="small"
                style={{ width: "50%" }}
                onPressIn={() => { if (Keyboard.isVisible()) Keyboard.dismiss() }}
                onPress={() => {
                    const grossPricePerUnit = Number(`${parteEntera}.${parteDecimal}`);
                    if (!Number.isNaN(grossPricePerUnit)) props.onButtonPress(grossPricePerUnit)
                }}
            >
                Confirmar
            </Button>
        </View>
    );
};
