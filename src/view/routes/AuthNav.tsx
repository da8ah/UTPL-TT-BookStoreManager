import { Layout, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import SignIn from "../auth/SignIn";
import RootNav from "./RootNav";

export default function AuthNav() {
    const [isAuth, setAuth] = useState<boolean>(false)
    useEffect(() => {
        setTimeout(async () => {
            if (!isAuth) setAuth(!isAuth);
        }, 2000);
    });
    return (
        <>
            {
                isAuth ?
                    <RootNav /> :
                    <SignIn />
            }
        </>
    )
}

const LoadingAlert = () => (
    <Layout style={[styles.common, styles.container]}>
        <Text status='info' appearance='hint' style={{ fontSize: 10, fontStyle: "italic", textTransform: "uppercase" }}>
            BookStore Manager
        </Text>
        <ActivityIndicator />
    </Layout>
);

const styles = StyleSheet.create({
    common: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    container: {
        flex: 1
    },
});