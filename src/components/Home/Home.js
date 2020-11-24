import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { 
    Container, 
    Grid, 
    // useTheme
    } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import HeroStepper from "../Common/Hero/HeroStepper";
import ProductList from "../Common/CardList/ProductList";
import CardList from "../Common/CardList/CardList";
import { fetchCatalogProducts } from "../../actions/actionsProductCatalog";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));


function Home() {
    const classes = useStyles();
    // const theme = useTheme();

    const productCatalog = useSelector(store => store.productCatalog);
    // const error = useSelector(store => store.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCatalogProducts());
    }, [dispatch]);

    // console.log(productCatalog);

    return (
            <Container>
                <p>Home</p>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <HeroStepper />
                    </Grid>
                    <ProductList productDataList={productCatalog.products} />
                    <Grid item xs={12}>
                        <CardList />
                    </Grid>
                </Grid>
            </Container>
          );
}

export default Home;