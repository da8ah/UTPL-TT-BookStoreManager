import { Button, Icon, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { globalStyles as styles } from "../../styles/styles";

export default function AlertDeleteFailed(props: {
    onButtonPress: () => void
}) {
    return <View style={[styles.common, { backgroundColor: 'white', padding: 20, borderRadius: 20 }]}>
        <View style={[styles.common, { marginTop: 10 }]}>
            <Text style={{ textTransform: "uppercase" }}>La operación falló</Text>
            <Icon name="alert-circle-outline" fill="darkred" height="30" width="30" />
            <Text style={{ fontSize: 12, marginVertical: 5 }}>(El registro no pudo ser eliminado)</Text>
        </View>
        <Button size="small" status="info" style={{ width: "50%", marginTop: 10 }} onPress={() => props.onButtonPress()}>
            Ok
        </Button>
    </View>
}