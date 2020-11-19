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

export default function NewProductConfiguration() {
  const classes = useStyles();
  return (
    <Container>
      <p>New Product Under Construction</p>
    </Container>
  );
}
