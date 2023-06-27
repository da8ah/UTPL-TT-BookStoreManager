import { useContext } from "react";
import { AuthContext } from "../../hooks/context/AuthContext";
import SignIn from "../auth/SignIn";
import RootNav from "./RootNav";

export default function AuthNav() {
    const { isAuth } = useContext(AuthContext)
    return (
        <>
            {
                isAuth ? <RootNav /> : <SignIn />
            }
        </>
    )
}
