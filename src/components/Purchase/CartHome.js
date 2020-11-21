import React from 'react';
import { 
  Container,
  Grid,
  useTheme
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CardList from "../Common/CardList/CardList";



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

export default function CartHome() {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Container>
      <p>Cart</p>
      <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
              <CardList />
          </Grid>
          <Grid item xs={12}>
              <CardList />
          </Grid>
      </Grid>
  </Container>
  );
}
