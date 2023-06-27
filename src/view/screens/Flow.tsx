import { List, useTheme } from "@ui-kitten/components";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import BillingInfo from "../../model/core/entities/BillingInfo";
import Card from "../../model/core/entities/Card";
import { CardTransaction } from "../../model/core/entities/CardTransaction";
import Cart from "../../model/core/entities/Cart";
import Client from "../../model/core/entities/Client";
import ToBuyBook from "../../model/core/entities/ToBuyBook";
import SearchBar from "../components/SearchBar";
import TransactionCard from "../components/TransactionCard";
import { stockBooks } from "./Home";
import { ThemeContext } from "../../hooks/context/ThemeContext";

const billingInfo = new BillingInfo("tiber", "1000000001", "Loja", "Loja", "000", "Principal y Secundaria");
const client = new Client("tiber", "da8ah", "tiber@email.com", "+593000000001", "tiber", billingInfo);
client.setCards([new Card("da8ah", "0000", "123", new Date().toLocaleDateString())]);
const toBuyBook = new ToBuyBook(
    stockBooks[0].getIsbn(),
    stockBooks[0].getImgRef(),
    stockBooks[0].getTitle(),
    stockBooks[0].getAuthor(),
    stockBooks[0].getReleaseDate(),
    stockBooks[0].getGrossPricePerUnit(),
    stockBooks[0].isInOffer(),
    stockBooks[0].getDiscountPercentage(),
    stockBooks[0].itHasIva(),
    1,
);

const cart = new Cart([toBuyBook]);

const cardTransactions = [
    new CardTransaction(
        "id",
        client.getCards()[0].getCardNumber(),
        client.getUser(),
        client.getName(),
        client.getEmail(),
        client.getMobile(),
        new Date().toLocaleDateString(),
        cart.getTotalPrice(),
        cart
    )
]

const TransactionsLayout = () => {
    const { themeMode } = useContext(ThemeContext)
    const theme = useTheme()
    const [transactions, setTransactions] = useState<CardTransaction[]>(cardTransactions.reverse());
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const queryDataFromServer = () => {
        setRefreshing(true);
        setTimeout(async () => {
            setTransactions(cardTransactions.reverse());
            setRefreshing(false);
        }, 2000);
    };

    useEffect(() => { }, [transactions]);

    return (
        <View style={styles.transactionsLayout}>
            <List
                scrollEnabled
                // testID='listTransactions'
                key={"transactions"}
                style={styles.mainListLayout}
                contentContainerStyle={styles.flatListLayout}
                initialNumToRender={5}
                data={transactions}
                extraData={transactions}
                renderItem={TransactionCard}
                refreshing={refreshing}
                onRefresh={queryDataFromServer}
            />
        </View>
    );
};

export default function Flow() {
    return (
        <View style={{ flex: 1 }}>
            <SearchBar />
            <TransactionsLayout />
        </View>
    );
};

const styles = StyleSheet.create({
    common: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    // searchBarLayout: { flex: 1, paddingVertical: 20 },
    transactionsLayout: { flex: 1 },
    mainListLayout: { backgroundColor: "transparent", flex: 1 },
    flatListLayout: { backgroundColor: "transparent" },
});

