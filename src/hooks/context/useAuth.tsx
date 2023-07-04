import { useState } from "react";

export const useAuth = () => {
    const [isAuth, setAuth] = useState(false);
    const tryToAuth = async () => {
        setTimeout(async () => {
            if (!isAuth) setAuth(true);
        }, 2000);
    }
    const logout = () => {
        if (isAuth) setAuth(false);
    }

    return [isAuth, tryToAuth, logout] as const;
}