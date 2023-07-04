import { List } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { View } from "react-native";
import BillingInfo from "../../model/core/entities/BillingInfo";
import Card from "../../model/core/entities/Card";
import { CardTransaction } from "../../model/core/entities/CardTransaction";
import Cart from "../../model/core/entities/Cart";
import Client from "../../model/core/entities/Client";
import ToBuyBook from "../../model/core/entities/ToBuyBook";
import SearchBar from "../components/SearchBar";
import { globalStyles as styles } from "../styles/styles";
import { stockBooks } from "./Home";
import TransactionCard from "./layouts/TransactionCard";

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
    ),
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
    ),
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
    ),
]

const TransactionsLayout = () => {
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
        <View style={{ flex: 1 }}>
            <List
                scrollEnabled
                // testID='listTransactions'
                key={"transactions"}
                style={{ backgroundColor: "transparent" }}
                contentContainerStyle={{ backgroundColor: "transparent" }}
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
        <View style={[styles.common, styles.body]}>
            <SearchBar placeholder="Buscar por coincidencia o ID" />
            <TransactionsLayout />
        </View>
    );
};
