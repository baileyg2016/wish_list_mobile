import { createContext } from "react";

const AuthContext = createContext("");
enum LoggedIn {
    YES,
    NO,
    RESTORING_LOGIN
}

export const Contexts = {
    AuthContext
}