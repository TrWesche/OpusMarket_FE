// import logo from '../../images/logo.svg';
import './App.css';
import NavBar from "../NavBar/NavBar";
import Routes from "../../routes/routes";
import theme from "../../theme";
import {ThemeProvider} from "@material-ui/core";
import { AuthContext } from "./AuthContext";
import { CookiesContext, getAllCookies, getCookie } from "../../contextProviders/CookiesContext";


import {useState, useEffect} from "react";
import jwt from "jsonwebtoken";
import { OPUS_PUBLIC_KEY } from "../../keys";

function App() {
  const [authToken, setAuthToken] = useState(null);
  const [contextCookies, setContextCookies] = useState(getAllCookies());

  useEffect(() => {
    async function getAuthContext() {
        if(contextCookies.sid) {
            const sessionToken = jwt.verify(contextCookies.sid, OPUS_PUBLIC_KEY);
            if (sessionToken.id && sessionToken.type) {
              setAuthToken(sessionToken);
            } else {
              setAuthToken(null);
            }
        }
    }
    getAuthContext();

    return function cleanup() {
      setAuthToken(null);
    }
  }, [contextCookies]);


  const updateContextCookies = (key) => {
    const result = getCookie(key);

    if (result) {
      setContextCookies({...contextCookies, [key]: result});
    }
  };

  return (
    <div className="App">
      <CookiesContext.Provider value={{contextCookies, updateContextCookies}}>
        <AuthContext.Provider value={{authToken}}>
          <ThemeProvider theme={theme}>
            <NavBar/>
            <Routes/>
          </ThemeProvider>
        </AuthContext.Provider>
      </CookiesContext.Provider>
    </div>
  );
}

export default App;
