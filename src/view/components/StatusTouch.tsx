import { Text } from "@ui-kitten/components";
import { ColorValue, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { globalStyles as styles } from "../styles/styles";

export type StatusTouchProps = Omit<TouchableOpacityProps, 'title' | 'color' | 'children'> & {
    height?: string | number,
    width?: string | number,
    rounded?: number,
    fontSize?: number,
    activeOpacity?: number,
    backgroundColor?: ColorValue,
    title?: JSX.Element | string,
    icon: () => JSX.Element
}

export default function StatusTouch(props: StatusTouchProps) {
    return <View style={[styles.common, props.style]}>
        {props.title && <Text style={{ fontSize: props.fontSize || 10 }}>{props.title}</Text>}
        <TouchableOpacity
            {...props}
            activeOpacity={props.activeOpacity || 0.7}
            style={[
                { borderRadius: props.rounded || 100, height: props.height || 50, width: props.width || 50, backgroundColor: props.backgroundColor, borderWidth: 0 },
                {
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            ]}
        >
            <>
                {props.icon()}
            </>
        </TouchableOpacity>
    </View>
}