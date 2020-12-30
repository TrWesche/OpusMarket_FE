import React from 'react';
import { useDispatch } from "react-redux";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button
} from '@material-ui/core';
import {
  Event
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import apiOpus from "../../../utils/apiOpusMarket";
import { fetchMerchantGatherings } from "../../../actions/actionsGathering";

const useStyles = makeStyles({
    root: {
      display: 'flex'
    },
    media: {
      width: 100,
      height: 100,
      overflow: 'clip'
    },
    gatheringTitle: {
      display: 'flex',
      overflow: 'clip',
      fontSize: '1rem'
    },
    gatheringDescription: {
      display: 'flex',
      overflow: 'clip',
      fontSize: '0.75rem',
    },
    gatheringLink: {
      display: 'flex',
      overflow: 'clip',
      fontSize: '0.75rem',
      color: 'blue'
    },
    imgContainer: {
      padding: '0.2rem 0.4rem',
    },
    detailsContainer: {
      padding: '0.2rem 0.4rem',
      minWidth: '40ch',
      flexGrow: 2
    },
    buttons: {
      display: 'flex',
      margin: '0.4rem'
    },
    buttonsContainer: {
      display: 'flex',
      justifyContent: 'end',
      flexWrap: 'wrap',
      flexGrow: 1
    }
});


function GatheringManagementCard({cardData, merchantId}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDeleteGathering = async (gatheringId) => {
    try {
      await apiOpus.deleteGathering(gatheringId);

      dispatch(fetchMerchantGatherings(merchantId))
    } catch (error) {
      console.log(error) 
    }
    
  }

  const renderImage = (cardData) => {
    if (cardData && cardData.images[0].url) {
      return (
        <CardMedia
          className={classes.media}
          image={cardData.img_urls[0]}
          title={cardData.alt_text}
        />
      )
    } else {
      return (
        <CardContent className={classes.media}>
            <Event />    
        </CardContent>
      )
    }
};

  return (
    <Card className={classes.root} variant="outlined">
      <div className={classes.imgContainer}>
        {renderImage()}
      </div>
      <div className={classes.detailsContainer}>
        <Typography className={classes.gatheringTitle}>
          {cardData.title}
        </Typography>
        <Typography className={classes.gatheringDescription}>
          {cardData.description}
        </Typography>
        <Typography className={classes.gatheringLink}>
          {cardData.gathering_link}
        </Typography>
      </div>
      <div className={classes.buttonsContainer}>
        <Button className={classes.buttons}  variant="contained" color="secondary" onClick={() => handleDeleteGathering(cardData.gathering_id)}>
          Delete Gathering
        </Button>
      </div>
    </Card>
  );
}

export default GatheringManagementCard;