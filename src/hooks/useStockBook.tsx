import { useState } from "react";
import StockBook from "../model/core/entities/StockBook";

export default function useStockBook(stockBook: StockBook) {
    const [book, setBook] = useState<StockBook>(stockBook || new StockBook("", "", "", "", "", "", ""));
    return [book, setBook] as const
}