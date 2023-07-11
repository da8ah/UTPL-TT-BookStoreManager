import { Modal, ModalProps } from "@ui-kitten/components";

export interface ModalFactory extends JSX.Element, ModalAttributes, ModalCallback { }
export interface ModalAttributes {
    modalType?: string,
    data?: number | string
}
export interface ModalCallback { onButtonPress?: (...args: any) => any }

type ModalDisplayProps = Omit<ModalProps, 'children'> & { children: ModalFactory }

export default function ModalDisplay(props: ModalDisplayProps) {
    return <Modal
        {...props}
        visible={props.visible || false}
        style={{ width: "70%" }}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    />
}
