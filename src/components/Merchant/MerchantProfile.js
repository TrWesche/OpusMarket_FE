import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container,
  Grid,
  Typography,
  Button,
  Fab
} from "@material-ui/core";
import {
  Edit,
  Add
} from "@material-ui/icons";

import {
  MERCHANT_ACCOUNT_UPDATE_PROFILE_PATH,
  MERCHANT_ACCOUNT_UPDATE_PASSWORD_PATH,
  MERCHANT_ACCOUNT_UPDATE_ABOUT_PATH,
  PRODUCT_MANAGEMENT_HOME_PATH,
  PRODUCT_MANAGEMENT_NEW_PRODUCT_PATH,
  GATHERING_MANAGEMENT_HOME_PATH,
  GATHERING_MANAGEMENT_NEW_PATH
} from "../../routes/_pathDict";

import {AuthContext} from "../App/AuthContext";
import { fetchMerchantProfile } from "../../actions/actionsMerchantPrivate";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    marginBottom: '2rem',
    backgroundColor: 'white',
    display: 'flex',
    flexWrap: 'wrap',
  },
  vSection: {
    display: 'flex',
    position: 'relative',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  hSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    border: '0.2rem solid white',
    backgroundColor: theme.palette.grey[200]
  },
  floatingButton: {
    display: 'flex',
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  storeBannerImg: {
    maxHeight: 300,
    height: '100%',
    display: 'block',
    overflow: 'hidden',
    width: '100%',
    objectFit: 'cover'
  },
  // margin: {
  //   margin: theme.spacing(1),
  // },
  // textField: {
  //   width: '25ch',
  // },
}));

function MerchantProfile() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const {authToken} = useContext(AuthContext);

  const currentUser = useSelector(store => store.currentUser);

  useEffect(() => {
    dispatch(fetchMerchantProfile());
  }, [dispatch]);


  // console.log(currentUser);
  // console.log(authToken);

  const handleRedirectClick = (destination) => {
    // console.log(destination)
    history.push(destination);
  }

  // const renderBanner = () => {
  //   const {logo_wide_url} = currentUser.about;
  //   if (logo_wide_url.length <= 0) {
  //     return (
  //       <Grid item xs={12} className={classes.vSection}>
  //         <Typography variant="subtitle2">Banner Image</Typography>
  //         <Fab 
  //           color="primary"
  //           aria-label="edit banner image"
  //           size="small" 
  //           className={classes.floatingButton}
  //           onClick={() => handleRedirectClick("Edit Banner Image")}
  //         >
  //           <Add fontSize="small" />
  //         </Fab>
  //       </Grid>
  //     )
  //   } else {
  //     return (
  //       <Grid item xs={12} className={classes.vSection}>
  //         <img className={classes.storeBannerImg} src={logo_wide_url}></img>
  //         <Fab 
  //           color="primary"
  //           aria-label="edit banner image"
  //           size="small" 
  //           className={classes.floatingButton}
  //           onClick={() => handleRedirectClick("Edit Banner Image")}
  //         >
  //           <Edit fontSize="small" />
  //         </Fab>
  //       </Grid>
  //     )
  //   };
  // };

  // const renderHeadline = () => {
  //   const {headline} = currentUser.about;
  //   if (headline.length <= 0) {
  //     return (
  //       <Grid item xs={12} className={classes.vSection}>
  //         <Button>Add a Headline</Button>
  //       </Grid>
  //     )
  //   } else {
  //     return (
  //       <Grid item xs={12} className={classes.vSection}>
  //         <Typography variant="h6">{headline}</Typography>
  //         <Fab 
  //           color="primary"
  //           aria-label="edit banner image"
  //           size="small" 
  //           className={classes.floatingButton}
  //           onClick={() => handleRedirectClick("Edit Banner Image")}
  //         >
  //           <Edit fontSize="small" />
  //         </Fab>
  //       </Grid>
  //     )
  //   };
  // };

  // const renderAbout = () => {
  //   const {about} = currentUser.about;
  //   if (about.length <= 0) {
  //     return (
  //       <Grid item xs={12} className={classes.vSection}>
  //         <Button>Add Your Story</Button>
  //       </Grid>
  //     )
  //   } else {
  //     return (
  //       <Grid item xs={12} className={classes.vSection}>
  //         <Typography variant="body1">{about}</Typography>
  //         <Button>Edit Your Story</Button>
  //       </Grid>
  //     )
  //   };
  // };

  // const renderThumbnail = () => {
  //   const {logo_narrow_url} = currentUser.about;
  //   if (logo_narrow_url.length <= 0) {
  //     return (
  //       <Grid item xs={12} className={classes.vSection}>
  //         <Button>Add Thumbnail Image</Button>
  //       </Grid>
  //     )
  //   } else {
  //     return (
  //       <Grid item xs={12} className={classes.vSection}>
  //         <img src={logo_narrow_url}></img>
  //         <Button>Edit Your Thumbnail</Button>
  //       </Grid>
  //     )
  //   };
  // };

  const renderRedirects = () => {
    return (
      <React.Fragment>
        <Grid item xs={12} md={6} lg={4} className={classes.hSection}>
          <Typography variant="subtitle1">Manage My Account</Typography>
          <Button onClick={() => handleRedirectClick(MERCHANT_ACCOUNT_UPDATE_PROFILE_PATH)}>
            Update Display Name & Email
          </Button>
          <Button onClick={() => handleRedirectClick(MERCHANT_ACCOUNT_UPDATE_ABOUT_PATH)}>
            Update Store Page
          </Button>
          <Button disabled onClick={() => handleRedirectClick(MERCHANT_ACCOUNT_UPDATE_PASSWORD_PATH)}>
            Change Password
          </Button>
          <Button disabled>Delete Account</Button>
        </Grid>
        <Grid item xs={12} md={6} lg={4} className={classes.hSection}>
          <Typography variant="subtitle1">Products</Typography>
          <Button onClick={() => handleRedirectClick(PRODUCT_MANAGEMENT_NEW_PRODUCT_PATH)}>Add A New Product</Button>
          <Button onClick={() => handleRedirectClick(PRODUCT_MANAGEMENT_HOME_PATH)}>Manage Existing Product(s)</Button>
        </Grid>
        <Grid item xs={12} lg={4} className={classes.hSection}>
          <Typography variant="subtitle1">Manage Gatherings</Typography>
          <Button onClick={() => handleRedirectClick(GATHERING_MANAGEMENT_NEW_PATH)}>Add A New Gathering</Button>
          <Button onClick={() => handleRedirectClick(GATHERING_MANAGEMENT_HOME_PATH)}>Manage Existing Gathering(s)</Button>
        </Grid>
      </React.Fragment>
    )
  }


  const render = () => {
    if (Object.keys(currentUser).length === 0) {
      return (
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12} className={classes.vSection}>
            <Typography>Loading...</Typography>
          </Grid>
        </Grid>
      )
    } else {
      return (
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12} className={classes.vSection}>
            <Typography variant="h4">Hi {currentUser.display_name}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.vSection}>
            <Typography variant="subtitle2">What would you like to do?</Typography>
          </Grid>
          {renderRedirects()}
        </Grid>
      )
    };
  };

  return (
    <Container className={classes.root}>
      {render()}
    </Container>
  );
}

export default MerchantProfile;