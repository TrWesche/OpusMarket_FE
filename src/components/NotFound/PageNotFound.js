import React from 'react';
import { 
  Container
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


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

export default function PageNotFound() {
  const classes = useStyles();
  return (
    <Container>
      <p>404 - We were unable to locate the page you requested</p>
    </Container>
  );
}
