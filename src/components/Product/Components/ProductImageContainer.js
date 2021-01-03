import React, { useEffect, useState } from 'react';
import { 
    Grid,
    Typography
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import HorizontalGridList from "./HorizontalGridList";

const useStyles = makeStyles((theme) => ({
  hSection: {
    margin: '0',
    flexGrow: 1
  }, 
  heroImage: {
    maxHeight: '500px',
    maxWidth: '500px',
    overflow: 'hidden'
  }
}));

export default function ProductImageContainer({imageList, merchant_id}) {
  const classes = useStyles();

  const [displayData, setDisplayData] = useState({
    img_url: '',
    img_alt_text: "Product Images Not Available"
  })

  useEffect(() => {
    if (imageList && imageList.length > 0) {
      setDisplayData({...displayData, img_url: imageList[0].url, img_alt_text: imageList[0].alt_text});
    } else {
      setDisplayData({...displayData, img_url: "", img_alt_text: "Product Images Not Available"});
    }
  }, [imageList]);

  const handleImageChange = (e) => {
    e.preventDefault();
    setDisplayData({...displayData, img_url: e.target.src, img_alt_text: e.target.alt});
  }

  // TODO: Meet the creator link
  return (
    <Grid item className={classes.hSection} xs={12} md={5}>
        <Grid item xs={12}>
            <Typography variant="overline">Meet the Creator</Typography>
        </Grid>
        <Grid item xs={12}>
            <img src={displayData.img_url} alt={displayData.img_alt_text} className={classes.heroImage}/>
        </Grid>
        <Grid item xs={12}>
            <HorizontalGridList tileData={imageList} handleTileClick={handleImageChange}/>
        </Grid>
    </Grid>
  );
}
