import { Button, Input, Text } from "@ui-kitten/components";
import { useState } from "react";
import { Keyboard, View } from "react-native";
import { globalStyles as styles } from "../../styles/styles";
import { patterns } from "../../../utils/validations";

export default function ModalStock(props: { stock: number, onButtonPress: (stock: number) => void }) {
    const [cant, setCant] = useState(props.stock.toFixed());

    return (
        <View style={[styles.common, { backgroundColor: 'white', padding: 20, borderRadius: 20 }]}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ color: 'black', textAlign: "right" }}>Cantidad de Artículos</Text>
                <Text style={{ color: 'black', width: "20%", textAlign: "center" }}>{Number(cant) !== 0 ? cant : "0"}</Text>
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
                        const regex = new RegExp(patterns.ModalInputs.STOCK);
                        if (!Number.isNaN(Number(newCant)) && regex.test(newCant)) setCant(newCant);
                    }}
                />
            </View>
            <Button
                size="small"
                style={{ width: "50%" }}
                onPressIn={() => { if (Keyboard.isVisible()) Keyboard.dismiss() }}
                onPress={() => {
                    const stock = Number(cant);
                    if (!Number.isNaN(stock)) props.onButtonPress(stock)
                }}
            >
                Confirmar
            </Button>
        </View>
    );
};
