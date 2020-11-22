// import logo from '../../images/logo.svg';
import './App.css';
import NavBar from "../NavBar/NavBar";
import Routes from "../../routes/routes";
import theme from "../../theme";
import {ThemeProvider} from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavBar />
        <Routes />
      </ThemeProvider>
    </div>
  );
}

export default App;
