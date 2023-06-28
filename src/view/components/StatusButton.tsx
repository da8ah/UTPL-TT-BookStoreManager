import { Button, ButtonProps, Text, TextProps } from "@ui-kitten/components";
import { ColorValue, View } from "react-native";
import { globalStyles as styles } from "../styles/styles";

export type StatusButtonProps = ButtonProps & {
    children: JSX.Element | string,
    textLeft?: boolean,
    captionText: JSX.Element | string,
    captionFontSize?: number,
    captionFontColor?: ColorValue,
    backgroundColor?: ColorValue
    activeOpacity?: number
}

const CaptionText = (props: TextProps & { captionFontSize?: number, captionFontColor?: ColorValue }) => {
    return <Text style={{ fontSize: props.captionFontSize || 18, color: props.captionFontColor }}>{props.children}</Text>
}
const UIKittenButton = (props: ButtonProps & { backgroundColor?: ColorValue, activeOpacity?: number }) => {
    return <Button {...props} size={props.size || 'small'} activeOpacity={props.activeOpacity || 0.7} style={[props.style, , props.backgroundColor !== undefined && { backgroundColor: props.backgroundColor }]}>{props.children}</Button>
}

export default function StatusButton(props: StatusButtonProps) {
    return <View style={[styles.common, { flexDirection: 'row' }]}>
        {props.textLeft ?
            <>
                <CaptionText captionFontSize={props.captionFontSize} captionFontColor={props.captionFontColor}>{props.captionText}</CaptionText>
                <UIKittenButton {...props}>{props.children}</UIKittenButton>
            </>
            :
            <>
                <UIKittenButton {...props}>{props.children}</UIKittenButton>
                <CaptionText captionFontSize={props.captionFontSize} captionFontColor={props.captionFontColor}>{props.captionText}</CaptionText>
            </>

        }
    </View>
}