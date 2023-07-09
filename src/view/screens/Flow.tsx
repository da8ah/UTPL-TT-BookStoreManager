import { List, ListProps } from "@ui-kitten/components";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import useAppData from "../../hooks/useAppData";
import { CardTransaction } from "../../model/core/entities/CardTransaction";
import SearchBar, { EmptyIcon } from "../components/SearchBar";
import { globalStyles as styles } from "../styles/styles";
import TransactionCard from "./layouts/TransactionCard";

const TransactionsLayout = (props: { transactions: CardTransaction[] } & Omit<ListProps, 'data' | 'renderItem'>) => {
    const transactions = props.transactions
    useEffect(() => { }, [transactions]);

    return (
        <View style={{ flex: 1 }}>
            <List
                {...props}
                scrollEnabled
                testID='transactions'
                key={"transactions"}
                style={{ backgroundColor: "transparent" }}
                contentContainerStyle={{ backgroundColor: "transparent" }}
                initialNumToRender={transactions.length}
                data={transactions}
                extraData={transactions}
                renderItem={TransactionCard}
            />
        </View>
    );
};

export default function Flow() {
    const { data } = useAppData()
    const [query, setQuey] = useState('')
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => { }, [query])

    const transactions = useMemo(() => {
        return data.getTransactions().filter((transaction) => {
            return transaction.getId().toLowerCase().includes(query.toLowerCase())
        })
    }, [data.getTransactions(), query])

    const queryDataFromServer = () => {
        setRefreshing(true);
        setTimeout(async () => {
            data.loadFromDataBase()
            setRefreshing(false);
        }, 2000);
    };

    const CloseIcon = (<EmptyIcon onPress={() => setQuey('')} />)
    return (
        <View style={[styles.common, styles.body]}>
            <SearchBar
                placeholder="Buscar por coincidencia o ID"
                accessoryRight={query.length > 0 ? CloseIcon : undefined}
                value={query}
                onChangeText={input => setQuey(input)}
            />
            <TransactionsLayout
                transactions={transactions}
                refreshing={refreshing}
                onRefresh={queryDataFromServer}
            />
        </View>
    );
};
