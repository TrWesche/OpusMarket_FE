import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
    Container,
    Grid,
    Typography
} from "@material-ui/core";
import { fetchProductDetails } from "../../actions/actionsProductDetail";
import { makeStyles } from '@material-ui/core/styles';

import HorizontalGridList from "./Components/HorizontalGridList";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem'
  },
  vSection: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    margin: '0'
  },
  hSection: {
    margin: '0',
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '25ch',
  },
  backgroundColor: {
    backgroundColor: "lightblue",
    width: '100%'
  }
}));

export default function ProductDetail() {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useDispatch();

  const {merchant_id, name, description, base_price, avg_rating, images, promotion, modifiers, reviews} = useSelector(store => store.productDetail);

  const [displayData, setDisplayData] = useState({
    img_url: '',
    img_alt_text: "Image Not Found"
  })

  useEffect(() => {
    dispatch(fetchProductDetails(+params.productID));
  }, [dispatch]);

  useEffect(() => {
    if (images) {
      setDisplayData({...displayData, img_url: images[0].url, img_alt_text: images[0].alt_text});
    }
  }, [images]);

  const handleImageChange = (e) => {
    e.preventDefault();
    setDisplayData({...displayData, img_url: e.target.src, img_alt_text: e.target.alt});
  }

  return (
    <Container className={classes.root}>
      <Grid container className={classes.vSection} spacing={1}>

        <Grid container className={classes.hSection} xs={12} md={5} spacing={1}>
          <Grid item xs={12}>
            <Typography variant="overline">Meet the Creator {merchant_id}</Typography>
          </Grid>
          <Grid item xs={12}>
            <img src={displayData.img_url} alt={displayData.img_alt_text}/>
          </Grid>
          <Grid item xs={12}>
            <HorizontalGridList tileData={images} handleTileClick={handleImageChange}/>
          </Grid>
        </Grid>

        <Grid container className={classes.hSection} xs={12} md={7} spacing={1}>
          <Grid item xs={12} spacing={1}>
            <Typography variant="h5" className={classes.backgroundColor}>{name}</Typography>
          </Grid>
          <Grid item xs={12} spacing={1}>
            <Typography className={classes.backgroundColor}>{description} Base Price:{base_price} Rating:{avg_rating}</Typography>
          </Grid>
          <Grid item xs={12} spacing={1}>
            <Typography className={classes.backgroundColor}>Product Order Column</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container className={classes.vSection} spacing={1}>
        <Grid item xs={12}>
          <Typography className={classes.backgroundColor}>Reviews</Typography>
        </Grid>
      </Grid>
      
    </Container>
  );
}
