import { useState } from "react"
import StockBook from "../model/core/entities/StockBook"

export default function useDraft(initialValue: StockBook) {
    const [book] = useState<StockBook>(initialValue)
    const [grossPricePerUnit, setGrossPricePerUnit] = useState(book.getGrossPricePerUnit())
    const [inOffer, setInOffer] = useState(book.isInOffer())
    const [discountPercentage, setDiscountPercentage] = useState(book.getDiscountPercentage())
    const [hasIva, setHasIva] = useState(book.itHasIva())
    const [ivaPercentage, setIvaPercentage] = useState(book.getIvaPercentage())
    const [stock, setStock] = useState(book.getStock())
    const [visible, setVisible] = useState(book.isVisible())
    const [recommended, setRecommended] = useState(book.isRecommended())
    const [bestSeller, setBestSeller] = useState(book.isBestSeller())
    const [recent, setRecent] = useState(book.isRecent())

    function setStatusProperty(propName: string, value: number | boolean) {
        switch (propName) {
            case 'grossPricePerUnit':
                if (typeof (value) === 'number') setGrossPricePerUnit(value)
                break;
            case 'inOffer':
                if (typeof (value) === 'boolean') setInOffer(value);
                break;
            case 'discountPercentage':
                if (typeof (value) === 'number') setDiscountPercentage(value)
                break;
            case 'hasIva':
                if (typeof (value) === 'boolean') {
                    setHasIva(value);
                    book.setHasIva(value);
                    setIvaPercentage(book.getIvaPercentage())
                }
                break;
            case 'stock':
                if (typeof (value) === 'number') setStock(value)
                break;
            case 'visible':
                if (typeof (value) === 'boolean') setVisible(value)
                break;
            case 'recommended':
                if (typeof (value) === 'boolean') setRecommended(value)
                break;
            case 'bestSeller':
                if (typeof (value) === 'boolean') setBestSeller(value)
                break;
            case 'recent':
                if (typeof (value) === 'boolean') setRecent(value)
                break;
        }
    }

    return [
        grossPricePerUnit,
        inOffer,
        discountPercentage,
        hasIva,
        ivaPercentage,
        stock,
        visible,
        recommended,
        bestSeller,
        recent,
        setStatusProperty
    ] as const
}