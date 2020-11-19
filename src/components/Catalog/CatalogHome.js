import React from "react";
import { 
    Container, 
    Grid,
    Typography,
    useTheme
    } from "@material-ui/core";
import HeroStepper from "../Common/Hero/HeroStepper";
import CardList from "../Common/CardList/CardList";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));

function Catalog() {
    const classes = useStyles();
    const theme = useTheme();

    return (
            <Container>
                <p>Catalog</p>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <HeroStepper />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '60vh' }} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <CardList />
                    </Grid>
                </Grid>
            </Container>
          );
}

export default Catalog;