import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container,
  Button
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import apiOpus from "../../utils/apiOpusMarket";
import { AuthContext } from "../App/AuthContext";
import { useCookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '25ch',
  },
}));

export default function UserLoginForm() {
  const {authToken, setAuthToken} = useContext(AuthContext);
  // const { cookies, setCookies } = Cookies.prototype.getAll();

  // console.log(cookies)
  const history = useHistory();
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: '',
    email: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await apiOpus.loginUser(values);
      
      // console.log(Cookies.prototype.get('sid'));
      // history.push('/');
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <Container>
      <p>User Login</p>
      <form onSubmit={handleSubmit}>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-email"
            value={values.email}
            onChange={handleChange('email')}
            aria-describedby="outlined-email-helper-text"
            inputProps={{
              'aria-label': 'email',
            }}
            labelWidth={0}
          />
          <FormHelperText id="outlined-email-helper-text">Email</FormHelperText>
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <Button type="submit" aria-label="user login" variant="contained" color="primary">
            Login
        </Button>
      </form>
    </Container>
  );
}
