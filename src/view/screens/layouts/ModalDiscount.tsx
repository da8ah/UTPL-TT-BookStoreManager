import Slider from "@react-native-community/slider";
import { Button, Text } from "@ui-kitten/components";
import { useState } from "react";
import { View } from "react-native";

export default function ModalDiscount(props: { grossPricePerUnit: number, discountPercentage: number, onButtonPress: (discountPercentage: number) => void }) {
    const [percentage, setPercentage] = useState(props.discountPercentage);
    const [amount, setAmount] = useState(0);
    const price = props.grossPricePerUnit;

    const calcAmount = (price: number, percentage: number) => (percentage * price) / 100;

    return (
        <View style={{ alignItems: "center", padding: 20, borderRadius: 20 }}>
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between" }}>
                <Text>Descuento de {percentage}% equivale a $ </Text>
                <Text style={{ textAlign: "left" }}>-{amount.toFixed(2)}</Text>
            </View>
            <Slider
                style={{ width: "100%", height: 40, marginVertical: 20 }}
                value={percentage}
                step={1}
                minimumValue={1}
                maximumValue={100}
                onValueChange={(value) => {
                    setPercentage(Math.round(value));
                    setAmount(calcAmount(price || 1, Math.round(percentage)));
                }}
            />
            <Button
                size="small"
                style={{ width: "50%" }}
                onPress={() => props.onButtonPress(percentage)}
            >
                Confirmar
            </Button>
        </View>
    );
};
