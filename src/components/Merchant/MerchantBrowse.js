import React, { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { 
  Container,
  Grid
} from "@material-ui/core";
import HeroStepper from "../Common/Hero/HeroStepper";
import MerchantGrid from "./Components/MerchantGrid";

import { makeStyles } from '@material-ui/core/styles';
import { fetchMerchantList } from '../../actions/actionsMerchant';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    display: 'flex',
    flexWrap: 'wrap',
  },
  vSection: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '25ch',
  },
}));

function MerchantBrowse() {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  // Retrieve search parameters from compiled query string
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  const searchParams = new URLSearchParams(location.search);
  
  // Link up to Redux productCatalog store
  const merchantBrowse = useSelector(store => store.merchantBrowse);
  // const error = useSelector(store => store.error);

  // Build query list for API call
  let merchantSearchParameters = {};
  const updateQueryParams = useCallback(() => {
    merchantSearchParameters = {};
      for (const [key, value] of searchParams) {
        merchantSearchParameters[key] = value;
      }
  }, [location.search]);

  // Update search results on changes to the query list
  useEffect(() => {
      updateQueryParams();
      dispatch(fetchMerchantList({searchParameters: merchantSearchParameters}));
  }, [dispatch, updateQueryParams]);


  return (
    <Container className={classes.root}>
        <Grid container className={classes.vSection} spacing={2}>
            <Grid item xs={12}>
                <HeroStepper />
            </Grid>
        </Grid>
        <Grid container className={classes.vSection} spacing={2}>
            <Grid item xs={12}>
                <MerchantGrid merchantDataList={merchantBrowse.merchants} listid={"browse-merchants"} />
            </Grid>
        </Grid>
    </Container>
);
}

export default MerchantBrowse;