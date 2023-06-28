import { Icon, Text, useTheme } from "@ui-kitten/components";
import { useState } from "react";
import { View } from "react-native";
import ActionButton from "../components/ActionButton";
import FormInput from "../components/FormInput";
import RoundButton from "../components/RoundButton";
import StatusButton from "../components/StatusButton";
import { globalStyles as styles } from "../styles/styles";
import BookInput from "../components/BookInput";
import StatusTouch from "../components/StatusTouch";

export default function User() {
    const [isbn, setISBN] = useState('')
    const [star, setStar] = useState(false)
    const theme = useTheme()
    const fontColor = theme['background-alternative-color-4']
    const AddIcon = () => <Icon name="person-add" fill={fontColor} height="35" width="35" />;
    const CloseIcon = () => <Icon name="log-out" fill={fontColor} height="35" width="35" />;
    const SaveIcon = () => <Icon name="save" fill={fontColor} height="35" width="35" />;
    const StarIcon = () => <Icon name="star" fill={star ? 'gold' : 'darkgray'} height="35" width="35" />;
    const EyeIcon = () => <Icon name="eye" fill={star ? 'turquoise' : 'darkgray'} height="35" width="35" />;
    const TrashIcon = () => <Icon name="trash-2" fill={fontColor} height="35" width="35" />;
    return <View style={[styles.common, { flex: 1 }]}>
        <View style={{ width: "90%" }}>
            <BookInput title={"ISBN"} showSoftInputOnFocus={!star} accessible={star} editable={star} focusable={star} caretHidden={star} value={isbn} onChangeText={(input) => setISBN(input)} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <RoundButton
                icon={AddIcon}
                backgroundColor={theme['color-warning-500']}
            />
            <RoundButton
                icon={CloseIcon}
                backgroundColor={theme['color-danger-500']}
            />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <ActionButton
                icon={SaveIcon}
                backgroundColor={theme['color-success-500']}
            />
            <View style={[styles.common, { width: 'auto', marginHorizontal: 5 }]}>
                <StatusTouch title="Más vendido" icon={StarIcon} height={40} width={40} activeOpacity={1} backgroundColor={'transparent'} onPressIn={() => setStar(!star)} />
                <StatusTouch icon={EyeIcon} height={40} width={40} activeOpacity={1} backgroundColor={'transparent'} onPressIn={() => setStar(!star)} />
            </View>
            <ActionButton
                icon={TrashIcon}
                backgroundColor={theme['color-danger-500']}
            />
        </View>
        <View>
            <FormInput isTop title="Usuario" placeholder="Usuario" />
            <FormInput title="Nombre" placeholder="Nombre" />
            <FormInput isBottom inputMode="email" title="Email" placeholder="Email" />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <StatusButton textLeft captionText={"% "} captionFontColor={theme['background-alternative-color-1']}>
                12
            </StatusButton>
        </View>
    </View >
}
