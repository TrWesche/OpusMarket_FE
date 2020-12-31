import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { 
    Container, 
    Grid,
    Typography
    // useTheme
    } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import HeroStepper from "../Common/Hero/HeroStepper";
import ProductList from "../Common/CardList/ProductList";
import { fetchCatalogProducts } from "../../actions/actionsProductCatalog";

const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: '2rem'
    },
    productSection: {
        backgroundColor: "#FFF",
        margin: "1rem 0"
    },
    sectionTitle: {
        margin: "0rem 0rem 0.5rem 0rem"
    }
}));


function Home() {
    const classes = useStyles();
    const productCatalog = useSelector(store => store.productCatalog);

    // const error = useSelector(store => store.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCatalogProducts({searchParameters: {featured: true, site_wide: true}, searchType: "featured"}));
        dispatch(fetchCatalogProducts({searchParameters: {sort: 'purchases-desc'}, searchType: "bestSelling"}));
    }, [dispatch]);

    // TODO: Hero Stepper Needs to be Finalized
    return (
            <Container className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <HeroStepper />
                    </Grid>
                    <Grid item xs={12} className={classes.productSection}>
                        <Grid item xs={12} className={classes.sectionTitle}>
                            <Typography variant='h5'>Featured Products</Typography>
                        </Grid>
                        <ProductList productDataList={productCatalog.featuredProducts} listid={"featured-products"}/>
                    </Grid>
                    <Grid item xs={12} className={classes.productSection}>
                        <Grid item xs={12} className={classes.sectionTitle}>
                            <Typography variant='h5'>Best Sellers</Typography>
                        </Grid>
                        <ProductList productDataList={productCatalog.bestSellingProducts} listid={"best-selling-products"}/>
                    </Grid>
                </Grid>
            </Container>
          );
}

export default Home;