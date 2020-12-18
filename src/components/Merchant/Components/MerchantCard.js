import React from 'react';
import { useHistory } from "react-router-dom";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      // display: 'flex'
      // maxWidth: 345,
    },
    media: {
      height: 110,
      overflow: 'clip'
    },
    merchantName: {
      display: 'flex',
      overflow: 'clip',
      fontSize: '0.75rem'
    },
    nameContainer: {
      padding: '0.2rem 0.4rem'
    },
    headlineContiner: {
      padding: '0.2rem 0.4rem',
      height: 50,
      textOverflow: 'ellipsis'
    }
});


function MerchantCard({cardData}) {
  const classes = useStyles();
  const history = useHistory();

  const handleViewMerchant = () => {
    history.push(`/merchants/${cardData.id}`);
  }

  const cardMediaRender = () => {
    if(cardData.logo) {
      return (
        <CardMedia
          className={classes.media}
          image={cardData.logo}
          title={`${cardData.display_name}'s logo`}
        />
      )
    } else {
      return (
        <CardContent className={classes.media}>
          <Typography>No Logo Avaiable</Typography>
        </CardContent>
      )
    }
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea onClick={handleViewMerchant}>
        {cardMediaRender()}
        <CardContent className={classes.nameContainer}>
          <Typography 
            gutterBottom variant="caption" 
            className={classes.merchantName}
          >
            {cardData.display_name}
          </Typography>
          <Typography className={classes.headlineContiner}>
            {cardData.headline}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MerchantCard;