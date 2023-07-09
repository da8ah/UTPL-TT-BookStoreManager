import { useState } from "react";
import useAppData from "../useAppData";

export const useAuthCTX = () => {
    const { data } = useAppData()
    const [isAuth, setAuth] = useState(false);
    const tryToAuth = async (user: string, password: string) => {
        setTimeout(async () => {
            data.login(user, password)
            setAuth(true);
        }, 2000);
    }
    const logout = () => {
        setAuth(false);
    }

    return [isAuth, tryToAuth, logout] as const;
}