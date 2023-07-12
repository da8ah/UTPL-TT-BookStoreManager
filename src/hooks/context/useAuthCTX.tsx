import { useState } from "react";
import Admin from "../../model/core/entities/Admin";
import useAppViewModel from "./useAppViewModel";

export const useAuthCTX = () => {
    const { vimo } = useAppViewModel()
    const [isAuth, setAuth] = useState(false);
    const tryToAuth = async (credentials?: { user: string, password: string }) => {
        if (credentials === undefined) setAuth(await vimo.login())
        else setAuth(await vimo.login(new Admin(credentials.user, '', '', '', credentials.password)))
    }
    const logout = () => {
        setAuth(false);
    }

    return [isAuth, tryToAuth, logout] as const;
}