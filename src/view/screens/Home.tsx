import { List, ListProps } from "@ui-kitten/components";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import useAppData from "../../hooks/useAppData";
import StockBook from "../../model/core/entities/StockBook";
import SearchBar, { EmptyIcon } from "../components/SearchBar";
import { globalStyles as styles } from "../styles/styles";
import BookCard from "./layouts/BookCard";

const BookStore = (props: { books: StockBook[] } & Omit<ListProps, 'data' | 'renderItem'>) => {
    const books = props.books
    useEffect(() => { }, [books]);

    return (
        <View style={{ flex: 1 }}>
            <List
                {...props}
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
            />
        </View>
    );
};

export default function Home() {
    const { data } = useAppData()
    const [query, setQuey] = useState('')
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => { }, [query])

    const books = useMemo(() => {
        return data.getBooks().filter((book) => {
            return book.getAuthor().toLowerCase().includes(query.toLowerCase())
        })
    }, [data.getBooks(), query])

    const queryDataFromServer = () => {
        setRefreshing(true);
        setTimeout(async () => {
            data.loadFromDataBase()
            setRefreshing(false);
        }, 2000);
    };

    const CloseIcon = (<EmptyIcon onPress={() => setQuey('')} />)
    return <View style={[styles.common, styles.body]}>
        <SearchBar
            placeholder="Buscar por coincidencia o ISBN"
            accessoryRight={query.length > 0 ? CloseIcon : undefined}
            value={query}
            onChangeText={input => setQuey(input)}
        />
        <BookStore
            books={books}
            refreshing={refreshing}
            onRefresh={queryDataFromServer}
        />
    </View>
}
