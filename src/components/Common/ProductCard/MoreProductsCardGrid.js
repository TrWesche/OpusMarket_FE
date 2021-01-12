import React from 'react';
import { useHistory } from "react-router-dom";
import {
    Card,
    CardActionArea,
    CardContent,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      // display: 'flex'
      // maxWidth: 345,
    },
    viewMore: {
      display: 'flex',
      overflow: 'clip',
      fontSize: '1rem'
    },
    viewMoreContainer: {
      display: 'flex',
      height: 185,
      padding: '0.2rem 0.4rem',
      justifyContent: 'center',
      alignItems: 'center'
    }
});


function MoreProductsCardGrid({redirect}) {
  const classes = useStyles();
  const history = useHistory();

  const handleViewMoreProducts = () => {
    history.push(`${redirect}`);
  }


  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea onClick={handleViewMoreProducts}>
        <CardContent className={classes.viewMoreContainer}>
          <Typography 
            gutterBottom variant="caption" 
            className={classes.viewMore}
          >
            View More...
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MoreProductsCardGrid;