import React from "react";
import { 
    Container, 
    Grid, 
    useTheme
    } from "@material-ui/core";
import HeroStepper from "../Common/Hero/HeroStepper";
import CardList from "../Common/CardList/CardList";
import homeStyles from "./homeStyles";


function Home() {
    const classes = homeStyles();
    const theme = useTheme();

    return (
            <Container>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <HeroStepper />
                    </Grid>
                    <Grid item xs={12}>
                        <CardList />
                    </Grid>
                    <Grid item xs={12}>
                        <CardList />
                    </Grid>
                </Grid>
            </Container>
          );
}

export default Home;