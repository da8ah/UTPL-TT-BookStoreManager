import Slider from "@react-native-community/slider";
import { Button, Text } from "@ui-kitten/components";
import { useState } from "react";
import { View } from "react-native";
import { globalStyles as styles } from "../../styles/styles";

export default function ConfirmationSave(props: {
    onButtonPress: () => void
}) {
    const [percentage, setPercentage] = useState(1);
    const [buttonDisabled, setButtonDisabledState] = useState(true);

    return (
        <View style={[styles.common, { backgroundColor: 'white', padding: 20, borderRadius: 20 }]}>
            <Text style={{ color: 'black' }}>Guardar Nuevo Registro</Text>
            <Slider
                style={{ width: "100%", height: 40, paddingTop: 10 }}
                value={percentage}
                step={1}
                minimumValue={1}
                maximumValue={100}
                onValueChange={(value) => setPercentage(value)}
                onSlidingComplete={(value) => (value === 100 ? setButtonDisabledState(false) : setButtonDisabledState(true))}
            />
            <Text style={{ color: 'black', fontSize: 12, paddingVertical: 5 }}>(Deslice para confirmar {percentage}%)</Text>
            <Button
                disabled={buttonDisabled}
                size="small"
                status="success"
                style={{ width: "50%", paddingTop: 10 }}
                onPress={async () => { if (percentage === 100) props.onButtonPress() }}
            >
                Confirmar
            </Button>
        </View>
    );
};