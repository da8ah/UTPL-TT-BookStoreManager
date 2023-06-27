import { Icon, Text, useTheme } from "@ui-kitten/components";
import { View } from "react-native";
import ActionButton from "../components/ActionButton";
import RoundButton from "../components/RoundButton";
import { globalStyles as styles } from "../styles/styles";

export default function User() {
    const theme = useTheme()
    const fontColor = theme['background-alternative-color-4']
    const AddIcon = () => <Icon name="person-add" fill={fontColor} height="35" width="35" />;
    const CloseIcon = () => <Icon name="log-out" fill={fontColor} height="35" width="35" />;
    const SaveIcon = () => <Icon name="save" fill={fontColor} height="35" width="35" />;
    return <View style={[styles.common, { flex: 1, flexDirection: 'row', justifyContent: 'space-around' }]}>
        <RoundButton
            icon={AddIcon}
            backgroundColor={theme['color-warning-500']}
        >
            <Text style={{ color: fontColor, fontSize: 12 }}>Nuevo</Text>
        </RoundButton>
        <RoundButton
            icon={CloseIcon}
            backgroundColor={theme['color-danger-500']}
        >
            <Text style={{ color: fontColor, fontSize: 12 }}>Salir</Text>
        </RoundButton>
        <ActionButton
            height={50}
            width={80}
            rounded={5}
            icon={SaveIcon}
            backgroundColor={theme['color-success-500']}
        />
    </View>
}
