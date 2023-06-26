import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { ActivityIndicator, StyleSheet, ViewProps } from "react-native";
import SignIn from "../auth/SignIn";
import BottomNav from "../routes/BottomNav";

export default function AuthNav(props: ViewProps) {
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
                    <BottomNav {...props} /> :
                    <SignIn {...props} />
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