import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
    Container, 
    Grid,
    Typography
    } from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';
import { fetchMerchantDetails } from "../../actions/actionsMerchant";
import MerchantHeroContainer from "./Components/MerchantHeroContainer";
import MerchantHeadlineContainer from "./Components/MerchantHeadlineContainer";
import MerchantAboutContainer from "./Components/MerchantAboutContainer";
import ProductGrid from "../Common/CardList/ProductGrid";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '2rem',
        backgroundColor: 'white'
    },
    vSection: {
        flexGrow: 1,
    }
}));

function MerchantHome() {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();

  const merchantDetails = useSelector(store => store.merchantDetails);

  // Update search results on changes to the query list
  useEffect(() => {
      dispatch(fetchMerchantDetails(+params.merchantID));
  }, [dispatch]);


  // TODO: For merchant store section need to limit the quantity of items & add a link to differet page to 
  // browse the entire store.
  const render = () => {
    if (merchantDetails.id) {
      return (
        <Grid container>
          <Grid item xs={12}>
            <MerchantHeadlineContainer about={merchantDetails.about} display_name={merchantDetails.display_name}/>
          </Grid>
          <Grid item xs={6}>
            <MerchantHeroContainer 
              gatherings={merchantDetails.gatherings}
              featured_products={merchantDetails.featured_products}
              bios={merchantDetails.bios}
            />
          </Grid>
          <Grid item xs={6}>
            <MerchantAboutContainer about={merchantDetails.about} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">{merchantDetails.display_name} Store</Typography>
            <ProductGrid productDataList={merchantDetails.products} listid={`${merchantDetails.id}-products`}/>
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