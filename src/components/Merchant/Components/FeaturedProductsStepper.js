import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
  MobileStepper,
  Paper,
  Typography,
  Button
} from '@material-ui/core';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    flexGrow: 1,
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 350,
    display: 'flex',
    overflow: 'hidden',
    maxWidth: '100%', 
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    cursor: 'pointer'
  },
  noImgText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    width: '100%'  
  },
  saleText: {
    color: 'red',
    fontWeight: 'bold'
  }
}));

function FeaturedProductsStepper({featuredProducts}) {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = featuredProducts.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleViewProductDetails = (e) => {
    e.preventDefault();
    history.push(`/catalog/${e.target.dataset.id}`);
  }

  const renderImage = (product, index) => {
    if (Math.abs(activeStep - index) <= 2 && product.img_urls[0]) {
      return (
        <img className={classes.img} src={product.img_urls[0]} alt={product.name} data-id={product.id} onClick={handleViewProductDetails}/>
      )
    } else {
      return (
        <p className={classes.noImgText} data-id={product.id} onClick={handleViewProductDetails}>No Image Available</p>
      )
    }
  }

  const renderHeader = () => {
    if(featuredProducts[activeStep].promotion_price) {
      return(
        <Paper square elevation={0} className={classes.header}>
          <Typography>{featuredProducts[activeStep].name}</Typography>
          <Typography className={classes.saleText}>On Sale: ${featuredProducts[activeStep].promotion_price/100}</Typography>
        </Paper>
      )  
    } else {
      return(
        <Paper square elevation={0} className={classes.header}>
          <Typography>{featuredProducts[activeStep].name}</Typography>
          <Typography>${featuredProducts[activeStep].base_price/100}</Typography>
        </Paper>
      )
    }
  }

  return (
    <div className={classes.root}>
      {renderHeader()}
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        interval='5000'
      >
        {featuredProducts.map((product, index) => (
          <div className={classes.imgContainer} key={`product-${product.id}`}>
            {renderImage(product, index)}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>
  );
}

export default FeaturedProductsStepper;
