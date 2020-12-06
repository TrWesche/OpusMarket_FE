import { createContext, useContext } from "react";
import Cookies from "js-cookie";

const CookiesContext = createContext();

const useCookies = () => {
    const { cookies } = useContext(CookiesContext);
    return ( cookies );
};

const getAllCookies = () => {
    const result = Cookies.getJSON();
    return result;
}

const getCookie = (key) => {
    const result = Cookies.get(key);
    return result;
};

export {
    CookiesContext,
    useCookies,
    getCookie,
    getAllCookies
}