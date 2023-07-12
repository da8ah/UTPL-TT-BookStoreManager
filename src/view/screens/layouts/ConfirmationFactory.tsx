import { ModalAttributes } from "../../components/ModalDisplay"
import ConfirmationDelete from "./ConfirmationDelete"

interface SaveType extends ModalAttributes {
    modalType: 'save'
}
interface DeleteType extends ModalAttributes {
    modalType: 'delete',
    data: { bookISBN: string }
}
interface UpdateType extends ModalAttributes {
    modalType: 'update',
    data: { bookISBN: string }
}

export type ConfirmationAttributes = (SaveType | DeleteType | UpdateType | undefined)
export type ConfirmationCallback = { onButtonPress: (confirmation: boolean | undefined) => void }
export type ConfirmationFactory = ConfirmationAttributes & ConfirmationCallback

export default function ConfirmationFactory(props: ConfirmationFactory) {
    switch (props.modalType) {
        case 'save':
            return <></>//<ConfirmationSave onButtonPress={props.onButtonPress} />
        case 'delete':
            return <ConfirmationDelete bookISBN={props.data.bookISBN} onButtonPress={props.onButtonPress} />
        case 'update':
            return <></>//<ConfirmationUpdate bookISBN={props.data.bookISBN} onButtonPress={props.onButtonPress} />
        default:
            return <></>
    }
}
