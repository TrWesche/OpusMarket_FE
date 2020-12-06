// import logo from '../../images/logo.svg';
import './App.css';
import NavBar from "../NavBar/NavBar";
import Routes from "../../routes/routes";
import theme from "../../theme";
import {ThemeProvider} from "@material-ui/core";
import { useCookies } from "react-cookie";
import { AuthContext } from "./AuthContext";

import {useState, useEffect} from "react";
import jwt from "jsonwebtoken";
import { OPUS_PUBLIC_KEY } from "../../keys";

function App() {
  // TODO: Look at this post for option to replace react-cookie.  Makes it to hard to access Context it creates.
  // https://medium.com/swlh/react-hooks-usecookie-hook-26ac06ff36b0
  const [cookies, setCookies] = useCookies();
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    async function getAuthContext() {
        if(cookies.sid) {
            const sessionToken = jwt.verify(cookies.sid, OPUS_PUBLIC_KEY);
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
  }, [cookies])

  return (
    <div className="App">
      <AuthContext.Provider value={{authToken}}>
        <ThemeProvider theme={theme}>
          <NavBar/>
          <Routes/>
        </ThemeProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
