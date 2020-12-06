// import logo from '../../images/logo.svg';
import './App.css';
import NavBar from "../NavBar/NavBar";
import Routes from "../../routes/routes";
import theme from "../../theme";
import {ThemeProvider} from "@material-ui/core";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie] = useCookies();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavBar cookies={cookies}/>
        <Routes />
      </ThemeProvider>
    </div>
  );
}

export default App;
