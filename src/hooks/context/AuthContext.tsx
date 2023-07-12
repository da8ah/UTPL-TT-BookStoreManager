import { createContext } from "react";

export const AuthContext = createContext({
    isAuth: false,
    tryToAuth: async (credentials?: { user: string, password: string }) => { },
    logout: () => { },
});