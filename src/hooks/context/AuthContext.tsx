import { createContext } from "react";

export const AuthContext = createContext({
    isAuth: false,
    tryToAuth: async (user: string, password: string) => { },
    logout: () => { },
});