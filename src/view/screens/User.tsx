import { Icon, Text, useTheme } from "@ui-kitten/components";
import { useContext } from "react";
import { KeyboardAvoidingView, View } from "react-native";
import { AuthContext } from "../../hooks/context/AuthContext";
import useAppViewModel from "../../hooks/context/useAppViewModel";
import useKeyboard from "../../hooks/useKeyboard";
import ActionButton from "../components/ActionButton";
import FormInput from "../components/FormInput";
import RoundButton from "../components/RoundButton";
import { globalStyles as styles } from "../styles/styles";

export default function User() {
    const user = useAppViewModel().vimo.getUser()
    const [isKeyboardVisible] = useKeyboard()
    const { logout } = useContext(AuthContext)
    const theme = useTheme()

    const topButtons = [
        {
            iconName: "person-add",
            disabled: true,
            backgroundColor: theme['color-warning-500']
        },
        {
            iconName: "log-out",
            disabled: false,
            backgroundColor: theme['color-danger-600'],
            onPress: logout
        },
    ]
    const bottomButtons = [
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

    return <View style={[styles.common, { flex: 1 }]}>
        <View style={{ display: isKeyboardVisible ? 'none' : 'flex', flex: 1, width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            {topButtons.map((button, index) => {
                return <RoundButton key={`user-round-button-${index}`}
                    disabled={button.disabled}
                    size="small"
                    icon={() => <Icon name={button.iconName} fill="black" height="40" width="40" />}
                    backgroundColor={button.backgroundColor}
                    onPress={button.onPress}
                />
            })}
        </View>
        <View>
            <Icon name="person-outline" fill={theme['background-alternative-color-4']} height="100" width="100" />
            <Text
                style={{ fontSize: 30, fontFamily: "serif", fontStyle: "italic", textAlign: "center", textTransform: "uppercase" }}
            >
                {user.getUser()}
            </Text>
        </View>
        <KeyboardAvoidingView style={{ flex: 2, width: '80%' }}>
            <FormInput isTop disabled showSoftInputOnFocus={false} formColor={theme['background-basic-color-2']} title="Nombre" placeholder="Nombre" textStyle={{ textTransform: "capitalize" }} value={user.getName()} />
            <FormInput disabled showSoftInputOnFocus={false} formColor={theme['background-basic-color-2']} inputMode="email" title="Email" placeholder="Email" value={user.getEmail()} />
            <FormInput isBottom disabled showSoftInputOnFocus={false} formColor={theme['background-basic-color-2']} title="Móvil" placeholder="Móvil" value={user.getMobile()} />
        </KeyboardAvoidingView>
        <View style={{ display: isKeyboardVisible ? 'none' : 'flex', flex: 1, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
            {bottomButtons.map((button, index) => {
                return <ActionButton key={`user-action-button-${index}`}
                    disabled={button.disabled}
                    icon={() => <Icon name={button.iconName} fill="white" height="30" width="30" />}
                    backgroundColor={button.backgroundColor}
                />
            })}
        </View>
    </View >
}
