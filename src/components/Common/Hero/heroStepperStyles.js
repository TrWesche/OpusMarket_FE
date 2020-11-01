import { makeStyles } from '@material-ui/core/styles';

const heroStepperStyles = makeStyles((theme) => ({
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
      height: 255,
      // maxWidth: 400,
      overflow: 'clip',
      display: 'block',
      width: '100%',
    },
}));

export default heroStepperStyles;