import { useEffect, useState } from "react"
import StockBook from "../model/core/entities/StockBook"

export default function useDraft(initialValue: StockBook) {
    const [book, setBook] = useState<StockBook>(initialValue)
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

    useEffect(() => {
        setIsbn(book.getIsbn())
        setTitle(book.getTitle())
        setAuthor(book.getAuthor())
        setReleaseDate(book.getReleaseDate())
        setCreatedDate(book.getCreatedDate())
        setDescription(book.getDescription())
        setGrossPricePerUnit(book.getGrossPricePerUnit())
        setInOffer(book.isInOffer())
        setDiscountPercentage(book.getDiscountPercentage())
        setHasIva(book.itHasIva())
        setIvaPercentage(book.getIvaPercentage())
        setStock(book.getStock())
        setVisible(book.isVisible())
        setRecommended(book.isRecommended())
        setBestSeller(book.isBestSeller())
        setRecent(book.isRecent())
    }, [book])

    function setBasicProperty(propName: string, value: string) {
        switch (propName) {
            case 'isbn':
                book.setIsbn(value.trim())
                setIsbn(value)
                break;
            // case 'imgRef':
            //     book.setImgRef(value)
            //     setImgRef(value)
            //     break;
            case 'title':
                book.setTitle(value.trim())
                setTitle(value)
                break;
            case 'author':
                book.setAuthor(value.trim())
                setAuthor(value)
                break;
            case 'releaseDate':
                book.setReleaseDate(value.trim())
                setReleaseDate(value)
                break;
            case 'createdDate':
                book.setCreatedDate(value.trim())
                setCreatedDate(value)
                break;
            case 'description':
                book.setDescription(value.trim())
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
        setBook,
        setBasicProperty,
        setStatusProperty
    ] as const
}
