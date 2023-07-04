import { Icon, Text, useTheme } from "@ui-kitten/components";
import { View } from "react-native";
import ActionButton from "../components/ActionButton";
import FormInput from "../components/FormInput";
import RoundButton from "../components/RoundButton";
import { globalStyles as styles } from "../styles/styles";

export default function User() {
    const theme = useTheme()
    const buttons = [
        {
            iconName: "edit",
            disabled: true,
            backgroundColor: theme['color-warning-500']
        },
        {
            iconName: "slash",
            disabled: true,
            backgroundColor: theme['color-warning-500']
        },
        {
            iconName: "trash-2",
            disabled: true,
            backgroundColor: theme['color-danger-500']
        },
        {
            iconName: "save",
            disabled: true,
            backgroundColor: theme['color-success-500']
        },
    ]
    const AddIcon = () => <Icon name="person-add" fill="black" height="35" width="35" />;
    const CloseIcon = () => <Icon name="log-out" fill="black" height="35" width="35" />;
    return <View style={[styles.common, { flex: 1 }]}>
        <View style={{ flex: 1, width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <RoundButton
                disabled
                size="small"
                icon={AddIcon}
                backgroundColor={theme['color-warning-500']}
            />
            <RoundButton
                size="small"
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
            <FormInput isTop title="Nombre" placeholder="Nombre" />
            <FormInput inputMode="email" title="Email" placeholder="Email" />
            <FormInput isBottom title="Móvil" placeholder="Móvil" />
        </View>
        <View style={{ flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
            {buttons.map((button, index) => {
                return <ActionButton key={`user-action-button-${index}`}
                    disabled={button.disabled}
                    icon={() => <Icon name={button.iconName} fill="white" height="30" width="30" />}
                    backgroundColor={button.backgroundColor}
                />
            })}
        </View>
    </View >
}
