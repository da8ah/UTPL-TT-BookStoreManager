import ModalPrice from "./ModalPrice"
import ModalStock from "./ModalStock"

export type DraftModalType = 'grossPricePerUnit' | 'stock' | ''
export type DraftModalCallback = { onButtonPress: (data: number) => void }
export type DraftModalAttributes = {
    modalType: DraftModalType
    data: number
}

export type DraftModalFactory = DraftModalAttributes & DraftModalCallback

export default function ModalEditorFactory(props: DraftModalFactory) {
    switch (props.modalType) {
        case 'grossPricePerUnit':
            return <ModalPrice grossPricePerUnit={props.data} onButtonPress={props.onButtonPress} />
        case 'stock':
            return <ModalStock stock={props.data} onButtonPress={props.onButtonPress} />
        default:
            return <></>
    }
}
