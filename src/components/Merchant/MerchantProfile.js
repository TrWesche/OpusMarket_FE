import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { 
  Container,
  Grid,
  Typography,
  Button,
  Tooltip,
  Fab
} from "@material-ui/core";

import {
  Edit
} from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';

import {AuthContext} from "../App/AuthContext";

import { fetchMerchantProfile } from "../../actions/actionsMerchantPrivate";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    backgroundColor: 'white',
    display: 'flex',
    flexWrap: 'wrap',
  },
  vSection: {
    display: 'flex',
    position: 'relative',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
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


  console.log(currentUser);
  console.log(authToken);

  const handleEditClick = (destination) => {
    console.log(destination)
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
            <Tooltip title="Edit Display Name">
              <Fab 
                color="primary"
                aria-label="edit display name"
                size="small" 
                className={classes.floatingButton}
                onClick={() => handleEditClick("Edit Display Name Form")}
              >
                <Edit fontSize="small" />
              </Fab>
            </Tooltip>
          </Grid>
          {renderBanner()}
          {renderHeadline()}
          {renderAbout()}
          {renderThumbnail()}
          {renderRedirects()}
        </Grid>
      )
    };
  };

  const renderBanner = () => {
    const {logo_wide_url} = currentUser.about;
    if (logo_wide_url.length <= 0) {
      return (
        <Grid item xs={12} className={classes.vSection}>
          <Button>Add Banner Image</Button>
        </Grid>
      )
    } else {
      return (
        <Grid item xs={12} className={classes.vSection}>
          <img className={classes.storeBannerImg} src={logo_wide_url}></img>
          <Fab 
                color="primary"
                aria-label="edit banner image"
                size="small" 
                className={classes.floatingButton}
                onClick={() => handleEditClick("Edit Banner Image")}
              >
                <Edit fontSize="small" />
            </Fab>
        </Grid>
      )
    };
  };

  const renderHeadline = () => {
    const {headline} = currentUser.about;
    if (headline.length <= 0) {
      return (
        <Grid item xs={12} className={classes.vSection}>
          <Button>Add a Headline</Button>
        </Grid>
      )
    } else {
      return (
        <Grid item xs={12} className={classes.vSection}>
          <Typography variant="h6">{headline}</Typography>
          <Button>Edit Headline</Button>
        </Grid>
      )
    };
  };

  const renderAbout = () => {
    const {about} = currentUser.about;
    if (about.length <= 0) {
      return (
        <Grid item xs={12} className={classes.vSection}>
          <Button>Add Your Story</Button>
        </Grid>
      )
    } else {
      return (
        <Grid item xs={12} className={classes.vSection}>
          <Typography variant="body1">{about}</Typography>
          <Button>Edit Your Story</Button>
        </Grid>
      )
    };
  };

  const renderThumbnail = () => {
    const {logo_narrow_url} = currentUser.about;
    if (logo_narrow_url.length <= 0) {
      return (
        <Grid item xs={12} className={classes.vSection}>
          <Button>Add Thumbnail Image</Button>
        </Grid>
      )
    } else {
      return (
        <Grid item xs={12} className={classes.vSection}>
          <img src={logo_narrow_url}></img>
          <Button>Edit Your Thumbnail</Button>
        </Grid>
      )
    };
  };

  const renderRedirects = () => {
    return (
      <Grid item xs={12} className={classes.vSection}>
        <Typography variant="subtitle1">Products</Typography>
        <Button>Add Product</Button>
        <Button>Manage Products</Button>

        <Typography variant="subtitle1">Gatherings</Typography>
        <Button>Add Gathering</Button>
        <Button>Manage Gatherings</Button>
      </Grid>
    )
  }


  return (
    <Container className={classes.root}>
      {render()}
    </Container>
  );
}

export default MerchantProfile;