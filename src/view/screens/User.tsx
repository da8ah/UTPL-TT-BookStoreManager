import { Icon, useTheme } from "@ui-kitten/components";
import { useRef, useState } from "react";
import { Keyboard, View } from "react-native";
import ActionButton from "../components/ActionButton";
import BookInput from "../components/BookInput";
import DatePicker from "../components/DatePicker";
import FormInput from "../components/FormInput";
import InputCarousel from "../components/InputCarousel";
import RoundButton from "../components/RoundButton";
import StatusButton from "../components/StatusButton";
import StatusTouch from "../components/StatusTouch";
import { globalStyles as styles } from "../styles/styles";

export default function User() {
    const [isbn, setISBN] = useState('')
    const [star, setStar] = useState(false)
    let inputRef = useRef<any>()

    const starHandler = () => {
        setStar(star => !star)
        Keyboard.dismiss()
        inputRef.current!.blur()
    }

    const theme = useTheme()
    const fontColor = theme['background-alternative-color-4']
    const AddIcon = () => <Icon name="person-add" fill={fontColor} height="35" width="35" />;
    const CloseIcon = () => <Icon name="log-out" fill={fontColor} height="35" width="35" />;
    const SaveIcon = () => <Icon name="save" fill={fontColor} height="35" width="35" />;
    const StarIcon = <Icon name="star" fill={star ? 'gold' : 'darkgray'} height="35" width="35" />;
    const EyeIcon = <Icon name="eye" fill={star ? 'turquoise' : 'darkgray'} height="35" width="35" />;
    const TrashIcon = () => <Icon name="trash-2" fill={fontColor} height="35" width="35" />;
    return <View style={[styles.common, { flex: 1 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <RoundButton
                icon={AddIcon}
                backgroundColor={theme['color-warning-500']}
            />
            <RoundButton
                icon={CloseIcon}
                backgroundColor={theme['color-danger-600']}
            />
        </View>
        <View style={{ width: "50%" }}>
            <DatePicker />
        </View>
        <View style={{ width: "90%" }}>
            <BookInput
                ref={input => { if (inputRef) inputRef.current = input }}
                title={"ISBN"}
                disabled={star}
                onChangeText={(input) => setISBN(input)}
            />
            <BookInput
                textarea
                ref={input => { if (inputRef) inputRef.current = input }}
                title={"Descripción"}
                disabled={star}
                onChangeText={(input) => setISBN(input)}
            />
        </View>
        <View style={[{ height: 50, marginVertical: 20, backgroundColor: 'black' }]}>
            <InputCarousel data={"12 Rules For Life An Antidote to Caos, the Beginning and the End."} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <ActionButton
                icon={SaveIcon}
                backgroundColor={theme['color-success-500']}
            />
            <View style={[styles.common, { width: 'auto', marginHorizontal: 5 }]}>
                <StatusTouch title="Más vendido" icon={StarIcon} height={40} width={40} activeOpacity={1} backgroundColor={'transparent'} onPressIn={starHandler} />
                <StatusTouch icon={EyeIcon} height={40} width={40} activeOpacity={1} backgroundColor={'transparent'} onPressIn={starHandler} />
            </View>
            <ActionButton
                icon={TrashIcon}
                backgroundColor={theme['color-danger-500']}
            />
        </View>
        <View style={{ width: '80%' }}>
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
