import React from 'react';
import { 
    Grid,
    Typography
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import HorizontalGridList from "./HorizontalGridList";

const useStyles = makeStyles((theme) => ({
  hSection: {
    margin: '0',
    flexGrow: 1,
    backgroundColor: 'white'
  }, 
  heroImage: {
    maxHeight: '500px',
    maxWidth: '500px',
    overflow: 'hidden'
  }
}));

export default function ProductImageContainer({heroImage, imageList, merchant_id, handleImageClick}) {
  const classes = useStyles();

  return (
    <Grid container className={classes.hSection} xs={12} md={5} spacing={1}>
        <Grid item xs={12}>
            <Typography variant="overline">Meet the Creator {merchant_id}</Typography>
        </Grid>
        <Grid item xs={12}>
            <img src={heroImage.img_url} alt={heroImage.img_alt_text} className={classes.heroImage}/>
        </Grid>
        <Grid item xs={12}>
            <HorizontalGridList tileData={imageList} handleTileClick={handleImageClick}/>
        </Grid>
    </Grid>
  );
}
