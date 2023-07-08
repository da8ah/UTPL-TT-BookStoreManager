import { List } from "@ui-kitten/components";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import StockBook from "../../model/core/entities/StockBook";
import SearchBar, { EmptyIcon } from "../components/SearchBar";
import { globalStyles as styles } from "../styles/styles";
import BookCard from "./layouts/BookCard";

export const stockBooks = [
    new StockBook(
        "9780141988511",
        "https://azure.blob.url.jpg",
        "12 Rules for Life: An Antidote to Chaos",
        "Jordan Peterson",
        "12/01/2018",
        "10/01/2023",
        "JBP's BestSeller",
        15.99,
        true,
        10,
        false,
        100,
        true,
        true,
        true,
        false,
    ), new StockBook(
        "9789584293978",
        "https://azure.blob.url.jpg",
        "12 More Rules for Life: Beyond Order",
        "HIRR SEBASTIAN",
        "12/01/2018",
        "10/01/2023",
        "The most influential public intellectual in the Western world right now.",
        25,
        true,
        52,
        false,
        100,
        true,
        true,
        true,
        false,
    ), new StockBook(
        "9789584293978",
        "https://azure.blob.url.jpg",
        "12 More Rules for Life: Beyond Order",
        "ROUSSEAU",
        "12/01/2018",
        "10/01/2023",
        "The most influential public intellectual in the Western world right now.",
        25,
        true,
        52,
        false,
        100,
        true,
        true,
        true,
        false,
    ), new StockBook(
        "9789584293978",
        "https://azure.blob.url.jpg",
        "12 More Rules for Life: Beyond Order",
        "GOLEMAN DANIEL",
        "12/01/2018",
        "10/01/2023",
        "The most influential public intellectual in the Western world right now.",
        25,
        true,
        52,
        false,
        100,
        true,
        true,
        true,
        false,
    ), new StockBook(
        "9789584293978",
        "https://azure.blob.url.jpg",
        "12 More Rules for Life: Beyond Order",
        "DC COMICS",
        "12/01/2018",
        "10/01/2023",
        "The most influential public intellectual in the Western world right now.",
        25,
        true,
        52,
        false,
        100,
        true,
        true,
        true,
        false,
    ), new StockBook(
        "9789584293978",
        "https://azure.blob.url.jpg",
        "12 More Rules for Life: Beyond Order",
        "Aristóteles",
        "12/01/2018",
        "10/01/2023",
        "The most influential public intellectual in the Western world right now.",
        25,
        true,
        52,
        false,
        100,
        true,
        true,
        true,
        false,
    ), new StockBook(
        "9789584293978",
        "https://azure.blob.url.jpg",
        "12 More Rules for Life: Beyond Order",
        "Jordan B. Peterson",
        "12/01/2018",
        "10/01/2023",
        "The most influential public intellectual in the Western world right now.",
        25,
        true,
        52,
        false,
        100,
        true,
        true,
        true,
        false,
    )
]

const BookStore = (props: { stockBooks: StockBook[] }) => {
    const books = props.stockBooks;
    // if (books.length <= 1) books.push(new StockBook("", "", "", "", "", "", ""))
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => { }, [books]);

    const queryDataFromServer = () => {
        setRefreshing(true);
        setTimeout(async () => {
            setRefreshing(false);
        }, 2000);
    };

    return (
        <View style={{ flex: 1 }}>
            <List
                scrollEnabled
                testID='books'
                key={"books"}
                style={{ backgroundColor: "transparent" }}
                contentContainerStyle={{ backgroundColor: "transparent" }}
                columnWrapperStyle={[styles.common, { justifyContent: 'flex-start', paddingRight: books.length <= 1 ? '50%' : undefined }]}
                numColumns={2}
                initialNumToRender={books.length}
                data={books}
                extraData={books}
                renderItem={BookCard}
                refreshing={refreshing}
                onRefresh={queryDataFromServer}
            />
        </View>
    );
};

export default function Home() {
    const [query, setQuey] = useState('')

    useEffect(() => { }, [query])

    const books = useMemo(() => {
        return stockBooks.filter((book) => {
            return book.getAuthor().toLowerCase().includes(query.toLowerCase())
        })
    }, [stockBooks, query])

    const CloseIcon = (<EmptyIcon onPress={() => setQuey('')} />)
    return <View style={[styles.common, styles.body]}>
        <SearchBar
            placeholder="Buscar por coincidencia o ISBN"
            accessoryRight={query.length > 0 ? CloseIcon : undefined}
            value={query}
            onChangeText={input => setQuey(input)}
        />
        <BookStore stockBooks={books} />
    </View>
}
