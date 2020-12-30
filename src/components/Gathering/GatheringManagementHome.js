import React, { useEffect, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import { 
  Container, 
  Grid,
  Typography
} from "@material-ui/core";
import GatheringManagementList from "./Components/GatheringManagementList";

// import apiOpus from "../../utils/apiOpusMarket";
import { fetchMerchantGatherings } from "../../actions/actionsGathering";

import {
  AuthContext
} from "../App/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '2rem',
    padding: '1rem 0'
  },
  margin: {
    margin: theme.spacing(1),
  },
  vSection: {
    flexGrow: 1,
  }
}));

export default function GatheringManagementHome() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {authToken} = useContext(AuthContext);

  const gatheringReducer = useSelector(store => store.gatheringReducer)

  useEffect(() => {
    dispatch(fetchMerchantGatherings(authToken.id))
  }, [dispatch]);
  
  const render = () => {
    if (!gatheringReducer.gatherings) {
      return (
        <Typography>Loading</Typography>
      )
    } else {
      return (
        <GatheringManagementList gatherings={gatheringReducer.gatherings} merchantId={authToken.id} />
      )
    }
  }

  return (
    <Container className={classes.root}>
      <Grid container className={classes.vSection} spacing={2}>
        <Grid item xs={12}>
            <Typography variant="h4">Manage Gatherings</Typography>
        </Grid>
        <Grid item xs={12}>
            {render()}
        </Grid>
      </Grid>
    </Container>
  );
}
