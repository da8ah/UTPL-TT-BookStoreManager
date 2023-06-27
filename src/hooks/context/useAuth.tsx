import { useState } from "react";

export const useAuth = () => {
    const [isAuth, setAuth] = useState(false);
    const tryToAuth = async () => {
        setTimeout(async () => {
            if (!isAuth) setAuth(!isAuth);
        }, 2000);
    }
    return [isAuth, tryToAuth] as const;
}