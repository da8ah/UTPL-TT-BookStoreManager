import { List } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import StockBook from "../../model/core/entities/StockBook";
import SearchBar from "../components/SearchBar";
import BookCard from "./layouts/BookCard";

export const stockBooks = [new StockBook(
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
)]

const BookStore = () => {
    const [books, setBooks] = useState<StockBook[]>(stockBooks);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => { }, [books]);

    const queryDataFromServer = () => {
        setRefreshing(true);
        setTimeout(async () => {
            setBooks(stockBooks)
            setRefreshing(false);
        }, 2000);
    };

    return (
        <View style={styles.booksLayout}>
            <List
                scrollEnabled
                // testID='listBooks'
                key={"books"}
                style={styles.mainListLayout}
                contentContainerStyle={styles.flatListLayout}
                columnWrapperStyle={styles.columnsStyle}
                numColumns={2}
                initialNumToRender={1}
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
    return <View style={{ flex: 1 }}>
        <SearchBar placeholder="Buscar por coincidencia o ISBN" />
        <BookStore />
    </View>
}


const styles = StyleSheet.create({
    booksLayout: { flex: 9 },
    mainListLayout: { backgroundColor: "transparent", flex: 1 },
    flatListLayout: { backgroundColor: "transparent" },
    columnsStyle: { alignContent: "center" }
});
