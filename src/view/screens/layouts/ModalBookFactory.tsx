import ModalDiscount from "./ModalDiscount"
import ModalPrice from "./ModalPrice"
import ModalStock from "./ModalStock"

type ModalDiscountType = {
    modalType: 'discountPercentage',
    data: {
        discountPercentage: number,
        grossPricePerUnit: number,
        stock?: never
    }
}
type ModalPriceType = {
    modalType: 'grossPricePerUnit',
    data: {
        discountPercentage?: never,
        grossPricePerUnit: number,
        stock?: never
    }
}
type ModalStockType = {
    modalType: 'stock',
    data: {
        discountPercentage?: never,
        grossPricePerUnit?: never,
        stock: number
    }
}

export type DraftModalAttributes = (ModalDiscountType | ModalPriceType | ModalStockType | undefined)
export type DraftModalCallback = { onButtonPress: (data: number) => void }
export type DraftModalFactory = DraftModalAttributes & DraftModalCallback

export default function ModalBookFactory(props: DraftModalFactory) {
    switch (props.modalType) {
        case 'discountPercentage':
            return <ModalDiscount grossPricePerUnit={props.data.grossPricePerUnit} discountPercentage={props.data.discountPercentage} onButtonPress={props.onButtonPress} />
        case 'grossPricePerUnit':
            return <ModalPrice grossPricePerUnit={props.data.grossPricePerUnit} onButtonPress={props.onButtonPress} />
        case 'stock':
            return <ModalStock stock={props.data.stock} onButtonPress={props.onButtonPress} />
        default:
            return <></>
    }
}
