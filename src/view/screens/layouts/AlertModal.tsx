import { Button, Icon, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { globalStyles as styles } from "../../styles/styles";
import { AlertFactory as AlertModalProps } from "./AlertFactory";

const status = {
    failed: 'danger',
    success: 'success'
}

export default function AlertModal(props: AlertModalProps) {
    const {
        modalType,
        data,
        onButtonPress
    } = props

    return <View style={[styles.common, { backgroundColor: 'white', padding: 20, borderRadius: 20 }]}>
        <View style={[styles.common, { paddingVertical: 5 }]}>
            <Text style={{ textTransform: "uppercase" }}>{data.title}</Text>
            <Icon name="alert-circle-outline" fill="darkred" height="30" width="30" />
            <Text style={{ fontSize: 12, paddingVertical: 5 }}>({data.message})</Text>
        </View>
        <Button size="small" status={status[modalType]} style={{ width: "50%", paddingTop: 10 }} onPress={() => onButtonPress()}>
            Ok
        </Button>
    </View>
}