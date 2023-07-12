import ConfirmationDelete from "./ConfirmationDelete"
import ConfirmationSave from "./ConfirmationSave"
import ConfirmationUpdate from "./ConfirmationUpdate"

export type ConfirmationAttributes = ({ modalType: 'save' | 'delete' | 'update', data?: never } | undefined)
export type ConfirmationCallback = { onButtonPress: () => void }
export type ConfirmationFactory = ConfirmationAttributes & ConfirmationCallback

export default function ConfirmationFactory(props: ConfirmationFactory) {
    switch (props.modalType) {
        case 'save':
            return <ConfirmationSave {...props} />
        case 'delete':
            return <ConfirmationDelete {...props} />
        case 'update':
            return <ConfirmationUpdate {...props} />
        default:
            return <></>
    }
}
