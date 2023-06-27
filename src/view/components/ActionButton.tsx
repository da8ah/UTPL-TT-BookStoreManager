import { Button, Text } from "@ui-kitten/components";
import { ButtonProps } from "react-native";

export type ActionButtonProps = {
    children?: JSX.Element | string,
    height?: string | number,
    width?: string | number,
    rounded?: number,
    title?: string
    backgroundColor?: string,
    icon?: () => JSX.Element
}

export default function ActionButton(props: Omit<ButtonProps, 'title' | 'color'> & ActionButtonProps) {
    return <Button
        {...props}
        accessoryLeft={props.icon}
        activeOpacity={0.7}
        style={[
            { borderRadius: props.rounded, height: props.height, width: props.width, backgroundColor: props.backgroundColor, borderWidth: 0 },
            {
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: props.icon === undefined ? 'row' : 'column'
            }
        ]}
    >
        <>
            {props.children !== undefined && (<Text>{props.children}</Text>)}
        </>
    </Button>
}