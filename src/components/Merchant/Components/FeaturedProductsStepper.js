import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
    flexGrow: 1
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
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
    justifyContent: 'center'
  }
}));

function FeaturedProductsStepper({featuredProducts}) {
  const classes = useStyles();
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

  // TODO: This needs to be changed to allow for user to click on the product featured
  const renderImage = (product, index) => {
    if (Math.abs(activeStep - index) <= 2 && product.img_urls[0]) {
      return (
        <img className={classes.img} src={product.img_urls[0]} alt={product.name} />
      )
    } else {
      return (
        <p>No Image Available</p>
      )
    }
  }

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{featuredProducts[activeStep].name}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
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
