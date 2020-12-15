import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
    Container, 
    Grid,
    Typography,
    // useTheme
    } from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';
import { fetchMerchantDetails } from "../../actions/actionsMerchant";
import MerchantHeroContainer from "./Components/MerchantHeroContainer";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '2rem'
    },
    vSection: {
        flexGrow: 1,
    }
}));

function MerchantHome() {
  // const classes = useStyles();
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();

  const merchantDetails = useSelector(store => store.merchantDetails);

  // Update search results on changes to the query list
  useEffect(() => {
      dispatch(fetchMerchantDetails(+params.merchantID));
  }, [dispatch]);


  const render = () => {
    if (merchantDetails.id) {
      return (
        <Grid container>
          <Grid item xs={12}>
            <p>Merchant Home Under Construction</p>
          </Grid>
          <Grid item xs={6}>
            <MerchantHeroContainer 
              gatherings={merchantDetails.gatherings}
              featured_products={merchantDetails.featured_products}
              bios={merchantDetails.bios}
            />
          </Grid>
          <Grid item xs={6}>

          </Grid>
        </Grid>

      )
    } else {
      return (
        <p>Loading</p>
      )
    }
  }

  return (
    <Container className={classes.root}>
      {render()}
    </Container>
  );
}

export default MerchantHome;