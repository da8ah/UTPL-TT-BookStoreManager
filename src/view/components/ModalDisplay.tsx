import { Modal, ModalProps } from "@ui-kitten/components";

type ModalDisplayProps = Omit<ModalProps, 'children'> & { children: JSX.Element | undefined }

export default function ModalDisplay(props: ModalDisplayProps) {
    return <Modal
        {...props}
        visible={props.visible || false}
        style={{ display: props.children === undefined ? 'none' : 'flex', width: "70%" }}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    />
}
