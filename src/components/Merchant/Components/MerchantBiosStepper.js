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
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
}));

function MerchantBiosStepper({merchantBios}) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = merchantBios.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  // {Math.abs(activeStep - index) <= 2 ? (
  //   <img className={classes.img} src={product.img_urls[0]} alt={product.name} />
  // ) : null}

  const renderImage = (bio, index) => {
    if (Math.abs(activeStep - index) <= 2 && bio.image_url) {
      return (
        <img className={classes.img} src={bio.image_url} alt={bio.name} />
      )
    } else {
      return (
        <p>No Image Available</p>
      )
    }
  };

  const renderName = (bio) => {
    return (
        <p>{bio.name}</p>
    )
  };

  const renderAbout = (bio) => {
      if (bio.bio) {
          return (
              <p>{bio.bio}</p>
          )
      } else {
          return (
              null
          )
      }
  }

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{merchantBios[activeStep].name}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {merchantBios.map((bio, index) => (
          <div key={`bio-${index}`}>
            {renderImage(bio, index)}
            {renderName(bio)}
            {renderAbout(bio)}
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

export default MerchantBiosStepper;
