import { Icon, Text, useTheme } from "@ui-kitten/components";
import { View } from "react-native";
import ActionButton from "../components/ActionButton";
import FormInput from "../components/FormInput";
import RoundButton from "../components/RoundButton";
import { globalStyles as styles } from "../styles/styles";

export default function User() {
    const theme = useTheme()
    const AddIcon = () => <Icon name="person-add" fill="black" height="35" width="35" />;
    const CloseIcon = () => <Icon name="log-out" fill="black" height="35" width="35" />;
    const EditIcon = () => <Icon name="edit" fill="white" height="30" width="30" />;
    const StopIcon = () => <Icon name="slash" fill="white" height="30" width="30" />;
    const TrashIcon = () => <Icon name="trash-2" fill={"white"} height="35" width="35" />;
    const SaveIcon = () => <Icon name="save" fill={"white"} height="35" width="35" />;
    return <View style={[styles.common, { flex: 1 }]}>
        <View style={{ flex: 1, width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <RoundButton
                disabled
                icon={AddIcon}
                backgroundColor={theme['color-warning-500']}
            />
            <RoundButton
                icon={CloseIcon}
                backgroundColor={theme['color-danger-600']}
            />
        </View>
        <View>
            <Icon name="person-outline" fill={theme['background-alternative-color-4']} height="100" width="100" />
            <Text
                style={{ fontSize: 30, fontFamily: "serif", fontStyle: "italic", textAlign: "center", textTransform: "uppercase" }}
            >
                Admin
            </Text>
        </View>
        <View style={{ flex: 2, width: '80%' }}>
            <FormInput isTop title="Usuario" placeholder="Usuario" />
            <FormInput title="Nombre" placeholder="Nombre" />
            <FormInput isBottom inputMode="email" title="Email" placeholder="Email" />
        </View>
        <View style={{ flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <ActionButton
                disabled
                icon={EditIcon}
                backgroundColor={theme['color-warning-500']}
            />
            <ActionButton
                disabled
                icon={StopIcon}
                backgroundColor={theme['color-warning-500']}
            />
            <ActionButton
                disabled
                icon={TrashIcon}
                backgroundColor={theme['color-danger-500']}
            />
            <ActionButton
                disabled
                icon={SaveIcon}
                backgroundColor={theme['color-success-500']}
            />
        </View>
    </View >
}
