import React from "react";
import { 
    Container, 
    Grid, 
    useTheme
    } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import HeroStepper from "../Common/Hero/HeroStepper";
import CardList from "../Common/CardList/CardList";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));


function Home() {
    const classes = useStyles();
    const theme = useTheme();

    return (
            <Container>
                <p>Home</p>
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