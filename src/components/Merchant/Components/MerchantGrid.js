import React from "react";
import {
    Grid,
    // useTheme
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import MerchantCard from "./MerchantCard";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
}));

function MerchantGrid({ merchantDataList, listid }) {
    const classes = useStyles();

    const render = () => {
        if(merchantDataList === undefined || merchantDataList.length === 0) {
            return (
                <Grid item xs={12}>
                    <p>Loading...</p>
                </Grid>
            )
        }

        if (merchantDataList.length) {
            return (
                <Grid container className={classes.root} spacing={2}>
                    {merchantDataList.map(merchantData => {
                        return (
                            <Grid item xs={4} md={3} lg={2} key={`${listid}-${merchantData.id}`}>
                                <MerchantCard cardData={merchantData}/>
                            </Grid>    
                        )
                    })}
                </Grid>
            )
        }
    }

    return (
        <Grid item xs={12}>
            {render()}
        </Grid>
        
    )
}

export default MerchantGrid; 
