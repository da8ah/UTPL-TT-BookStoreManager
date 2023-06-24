import { Layout, Text } from "@ui-kitten/components";
import { ActivityIndicator, StyleSheet } from "react-native";
import useAuth from "../../hooks/useAuth";
import Main from "../Main";
import SignIn from "../auth/SignIn";
import React from "react";

const LoadingAlert = () => (
    <Layout style={styles.container}>
        <Text status='info' appearance='hint' style={{ fontSize: 10, fontStyle: "italic", textTransform: "uppercase" }}>
            BookStore Manager
        </Text>
        <ActivityIndicator />
    </Layout>
);

export default function AuthNav() {
    const [isAuth, setAuth] = React.useState<boolean>(false)
    React.useEffect(() => {
        setTimeout(async () => {
            if (!isAuth) setAuth(!isAuth);
        }, 2000);
    });
    return (
        <>
            {
                isAuth ?
                    <Main /> :
                    <SignIn />
            }
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});