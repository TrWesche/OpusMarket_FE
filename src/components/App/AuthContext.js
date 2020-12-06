import { createContext, useContext } from "react";

const AuthContext = createContext();

const useAuth = () => {
    const { authToken } = useContext(AuthContext);
    return (authToken);
}

export {
    AuthContext,
    useAuth
};


// Big thanks to this post for guidance
// https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71