import { useState } from "react"
import StockBook from "../model/core/entities/StockBook"

export default function useDraft(initialValue: StockBook) {
    const [book] = useState<StockBook>(initialValue)
    const [isbn, setIsbn] = useState(book.getIsbn())
    // const [imgRef, setImgRef] = useState(book.getImgRef())
    const [title, setTitle] = useState(book.getTitle())
    const [author, setAuthor] = useState(book.getAuthor())
    const [releaseDate, setReleaseDate] = useState(book.getReleaseDate())
    const [createdDate, setCreatedDate] = useState(book.getCreatedDate())
    const [description, setDescription] = useState(book.getDescription())
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

    function setBasicProperty(propName: string, value: string) {
        switch (propName) {
            case 'isbn':
                book.setIsbn(value)
                setIsbn(value)
                break;
            // case 'imgRef':
            //     book.setImgRef(value)
            //     setImgRef(value)
            //     break;
            case 'title':
                book.setTitle(value)
                setTitle(value)
                break;
            case 'author':
                book.setAuthor(value)
                setAuthor(value)
                break;
            case 'releaseDate':
                book.setReleaseDate(value)
                setReleaseDate(value)
                break;
            case 'createdDate':
                book.setCreatedDate(value)
                setCreatedDate(value)
                break;
            case 'description':
                book.setDescription(value)
                setDescription(value)
                break;
        }
    }

    function setStatusProperty(propName: string, value: number | boolean) {
        switch (propName) {
            case 'grossPricePerUnit':
                if (typeof (value) === 'number') { book.setGrossPricePerUnit(value); setGrossPricePerUnit(value) }
                break;
            case 'inOffer':
                if (typeof (value) === 'boolean') { book.setInOffer(value); setInOffer(value) }
                break;
            case 'discountPercentage':
                if (typeof (value) === 'number') { book.setDiscountPercentage(value); setDiscountPercentage(value) }
                break;
            case 'hasIva':
                if (typeof (value) === 'boolean') {
                    book.setHasIva(value);
                    setHasIva(value);
                    setIvaPercentage(book.getIvaPercentage())
                }
                break;
            case 'stock':
                if (typeof (value) === 'number') { book.setStock(value); setStock(value); }
                break;
            case 'visible':
                if (typeof (value) === 'boolean') { book.setVisible(value); setVisible(value) }
                break;
            case 'recommended':
                if (typeof (value) === 'boolean') { book.setRecommended(value); setRecommended(value) }
                break;
            case 'bestSeller':
                if (typeof (value) === 'boolean') { book.setBestSeller(value); setBestSeller(value) }
                break;
            case 'recent':
                if (typeof (value) === 'boolean') { book.setRecent(value); setRecent(value) }
                break;
        }
    }

    return [
        isbn,
        // imgRef,
        title,
        author,
        releaseDate,
        createdDate,
        description,
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
        setBasicProperty,
        setStatusProperty
    ] as const
}
