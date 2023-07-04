import { useState } from "react";

export const useAuthCTX = () => {
    const [isAuth, setAuth] = useState(false);
    const tryToAuth = async () => {
        setTimeout(async () => {
            setAuth(true);
        }, 2000);
    }
    const logout = () => {
        setAuth(false);
    }

    return [isAuth, tryToAuth, logout] as const;
}