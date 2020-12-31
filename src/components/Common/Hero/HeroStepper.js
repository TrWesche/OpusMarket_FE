import React from 'react';
import {
    MobileStepper,
    Paper,
    Typography,
    Button,
    useTheme
} from '@material-ui/core';
import {
    KeyboardArrowLeft,
    KeyboardArrowRight
} from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
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
      maxHeight: 300,
      height: '100%',
      display: 'block',
      overflow: 'hidden',
      width: '100%',
      objectFit: 'cover'
    },
}));

const tutorialSteps = [
  {
    label: '3D printing with ZMorph VX multitool 3D printer and Voxelizer software.',
    imgPath:
      'https://images.unsplash.com/photo-1539586916228-3db588cc6f69?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1573&q=80',
  },
  {
    label: 'Eating at the Maschsee in Hannover',
    imgPath:
      'https://images.unsplash.com/photo-1510427979624-03bb913c923d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2086&q=80',
  },
  {
    label: 'Poster Boy',
    imgPath:
      'https://images.unsplash.com/photo-1583153777434-3f892eb61d50?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80',
  },
  {
    label: 'Burnt Orange and White Nikes',
    imgPath:
      'https://images.unsplash.com/photo-1608224107411-799a4c3de97d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    label: 'Herbal Supplements',
    imgPath:
      'https://images.unsplash.com/photo-1608354580506-716faac4aa36?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
];

function HeroStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{tutorialSteps[activeStep].label}</Typography>
      </Paper>
      <img
        className={classes.img}
        src={tutorialSteps[activeStep].imgPath}
        alt={tutorialSteps[activeStep].label}
      />
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

export default HeroStepper;