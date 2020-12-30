import React, { useEffect, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import { 
  Container, 
  Grid,
  Typography
} from "@material-ui/core";
import ProductManagementCardVList from "./Components/ProductManagementCardVList";

// import apiOpus from "../../utils/apiOpusMarket";
import { fetchCatalogProducts } from "../../actions/actionsProductCatalog";

import {
  AuthContext
} from "../App/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '2rem',
    padding: '1rem 0',
    backgroundColor: 'white'
  },
  margin: {
    margin: theme.spacing(1),
  },
  vSection: {
    flexGrow: 1,
  }
}));

function ProductManagementHome() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {authToken} = useContext(AuthContext);

  const productCatalog = useSelector(store => store.productCatalog)

  useEffect(() => {
    dispatch(fetchCatalogProducts({searchParameters: {mid: authToken.id}, searchType: "catalog"}))
  }, [dispatch]);

  return (
    <Container className={classes.root}>
      <Grid container className={classes.vSection} spacing={2}>
        <Grid item xs={12}>
            <Typography variant="h4">Manage Products</Typography>
        </Grid>
        <Grid item xs={12}>
            <ProductManagementCardVList productDataList={productCatalog.queryProducts} listid={"browse-catalog"} merchantId={authToken.id} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductManagementHome;