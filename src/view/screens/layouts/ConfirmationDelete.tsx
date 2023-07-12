import Slider from "@react-native-community/slider";
import { Button, Icon, Layout, Text } from "@ui-kitten/components";
import { useState } from "react";
import { View } from "react-native";
import useAppViewModel from "../../../hooks/context/useAppViewModel";
import { globalStyles as styles } from "../../styles/styles";

export default function ConfirmationDelete(props: {
    bookISBN: string
    onButtonPress: (confirmation: boolean | undefined) => void
}) {
    const { vimo } = useAppViewModel()
    const [percentage, setPercentage] = useState(1);
    const [buttonDisabled, setButtonDisabledState] = useState(true);

    return (
        <View style={[styles.common, { backgroundColor: 'white', padding: 20, borderRadius: 20 }]}>
            <Text>Eliminar Permanentemente</Text>
            <Slider
                style={{ width: "100%", height: 40, marginTop: 10 }}
                thumbTintColor="darkred"
                minimumTrackTintColor="darkred"
                value={percentage}
                step={1}
                minimumValue={1}
                maximumValue={100}
                onValueChange={(value) => setPercentage(value)}
                onSlidingComplete={(value) => (value === 100 ? setButtonDisabledState(false) : setButtonDisabledState(true))}
            />
            <Text style={{ fontSize: 12, marginVertical: 5 }}>(Deslice para confirmar {percentage}%)</Text>
            <Button
                disabled={buttonDisabled}
                size="small"
                status="danger"
                style={{ width: "50%", marginTop: 10 }}
                onPress={async () => {
                    if (percentage === 100) props.onButtonPress(true)//props.onButtonPress(await vimo.deleteBook(props.bookISBN))
                }}
            >
                Confirmar
            </Button>
        </View>
    );
};