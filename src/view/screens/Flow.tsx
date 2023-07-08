import { List } from "@ui-kitten/components";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import BillingInfo from "../../model/core/entities/BillingInfo";
import Card from "../../model/core/entities/Card";
import { CardTransaction } from "../../model/core/entities/CardTransaction";
import Cart from "../../model/core/entities/Cart";
import Client from "../../model/core/entities/Client";
import ToBuyBook from "../../model/core/entities/ToBuyBook";
import SearchBar, { EmptyIcon } from "../components/SearchBar";
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
        "id-1",
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
        "id-2",
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
        "ffdd",
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

const TransactionsLayout = (props: { transactions: CardTransaction[] }) => {
    const transactions = props.transactions.reverse()
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const queryDataFromServer = () => {
        setRefreshing(true);
        setTimeout(async () => {
            setRefreshing(false);
        }, 2000);
    };

    useEffect(() => { }, [transactions]);

    return (
        <View style={{ flex: 1 }}>
            <List
                scrollEnabled
                testID='transactions'
                key={"transactions"}
                style={{ backgroundColor: "transparent" }}
                contentContainerStyle={{ backgroundColor: "transparent" }}
                initialNumToRender={transactions.length}
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
    const [query, setQuey] = useState('')

    useEffect(() => { }, [query])

    const transactions = useMemo(() => {
        return cardTransactions.filter((transaction) => {
            return transaction.getId().toLowerCase().includes(query.toLowerCase())
        })
    }, [cardTransactions, query])

    const CloseIcon = (<EmptyIcon onPress={() => setQuey('')} />)
    return (
        <View style={[styles.common, styles.body]}>
            <SearchBar
                placeholder="Buscar por coincidencia o ID"
                accessoryRight={query.length > 0 ? CloseIcon : undefined}
                value={query}
                onChangeText={input => setQuey(input)}
            />
            <TransactionsLayout transactions={transactions} />
        </View>
    );
};
