import Slider from "@react-native-community/slider";
import { Button, Icon, Text } from "@ui-kitten/components";
import { useState } from "react";
import { View } from "react-native";
import { globalStyles as styles } from "../../styles/styles";

export default function ConfirmationUpdate(props: {
    bookISBN: string
    onButtonPress: (confirmation: boolean | undefined) => void
}) {
    const [percentage, setPercentage] = useState(1);
    const [buttonDisabled, setButtonDisabledState] = useState(true);

    return (
        <View style={[styles.common, { backgroundColor: 'white', padding: 20, borderRadius: 20 }]}>
            <Text>Deslice para confirmar {percentage}%</Text>
            <Slider
                style={{ width: "100%", height: 40, marginVertical: 20 }}
                value={percentage}
                step={1}
                minimumValue={1}
                maximumValue={100}
                onValueChange={(newPercentage) => setPercentage(newPercentage)}
                onSlidingComplete={(currentPercentage) => (currentPercentage === 100 ? setButtonDisabledState(false) : setButtonDisabledState(true))}
            />
            <Button
                disabled={buttonDisabled}
                size="small"
                status="success"
                style={{ width: "50%" }}
                onPress={async () => {
                    const confirmation = await newStockBookViMo.saveDataToServer();
                    if (confirmation === null) {
                        props.setModalChildren(
                            <View style={{ alignItems: "center", padding: 20, borderRadius: 20 }}>
                                <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
                                    <Text style={{ textTransform: "uppercase" }}>La operación falló</Text>
                                    <Icon name="alert-circle-outline" fill="darkred" height="30" width="30" />
                                    <Text style={{ fontSize: 10, marginVertical: 5 }}>(Contacte a soporte técnico o intente más tarde)</Text>
                                </View>
                                <Button size="small" status="danger" style={{ width: "50%", marginTop: 10 }} onPress={() => props.setModalVisibility(false)}>
                                    Ok
                                </Button>
                            </View>,
                        );
                        return;
                    }
                    if (!confirmation) {
                        props.setModalChildren(
                            <View style={{ alignItems: "center", padding: 20, borderRadius: 20 }}>
                                <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
                                    <Text style={{ textTransform: "uppercase" }}>Registro no creado</Text>
                                    <Icon name="alert-triangle-outline" fill="gold" height="30" width="30" />
                                    <Text style={{ fontSize: 12, marginVertical: 5 }}>(Verifique que los datos sean correctos)</Text>
                                </View>
                                <Button size="small" status="info" style={{ width: "50%", marginTop: 10 }} onPress={() => props.setModalVisibility(false)}>
                                    Ok
                                </Button>
                            </View>,
                        );
                    } else {
                        props.setModalChildren(
                            <View style={{ alignItems: "center", padding: 20, borderRadius: 20 }}>
                                <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
                                    <Text style={{ textTransform: "uppercase" }}>Registro Creado</Text>
                                    <Icon name="checkmark-circle-outline" fill="darkgreen" height="30" width="30" />
                                    <Text style={{ fontSize: 12, marginVertical: 5 }}>(Se redireccionará al Inicio)</Text>
                                </View>
                                <Button size="small" status="success" style={{ width: "50%", marginTop: 10 }} onPress={() => props.setModalVisibility(false)}>
                                    Ok
                                </Button>
                            </View>,
                        );
                    }
                }}
            >
                Confirmar
            </Button>
        </View>
    );
};