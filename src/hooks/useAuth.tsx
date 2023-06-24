import { useEffect, useState } from "react";

const useAuth = () => {
    const [auth, setAuth] = useState<boolean>(false);
    const changeAuthState = (value: boolean = false) => {
        // setTimeout(async () => {
        //     if (!isAuth) setAuth(!isAuth);
        // }, 2000);
        setAuth(value);
    }
    return [auth, changeAuthState] as const;
}

export default useAuth;