import { ModalAttributes } from "../../components/ModalDisplay"
import AlertDeleteFailed from "./AlertDeleteFailed"

interface FailedType extends ModalAttributes {
    modalType: 'failed'
}

export type AlertAttributes = (FailedType | undefined)
export type AlertCallback = { onButtonPress: () => void }
export type AlertFactory = AlertAttributes & AlertCallback

export default function AlertFactory(props: AlertFactory) {
    switch (props.modalType) {
        case 'failed':
            return <AlertDeleteFailed onButtonPress={props.onButtonPress} />
        default:
            return <></>
    }
}
