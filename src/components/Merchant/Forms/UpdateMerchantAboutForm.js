import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Container,
  Grid,
  Typography,
  OutlinedInput,
  FormHelperText,
  FormControl,
  Button,
  Link
} from "@material-ui/core";

import apiOpus from "../../../utils/apiOpusMarket";
import {
  MERCHANT_ACCOUNT_PROFILE_PATH
} from "../../../routes/_pathDict";

import {
  fetchMerchantProfile
} from "../../../actions/actionsMerchantPrivate";

import {
  AuthContext
} from "../../App/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
    marginBottom: '2rem',
    backgroundColor: 'white',
    display: 'flex',
    flexWrap: 'wrap',
  },
  storeBannerImg: {
    maxHeight: 300,
    height: '100%',
    display: 'block',
    overflow: 'hidden',
    width: '100%',
    objectFit: 'cover',
  },
  thumbnailImg: {
    height: 110,
    overflow: 'clip'
  },
  vSection: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: '0.5rem',
    margin: '2rem 0',
    border: '0.15rem solid #CCC',
  },
  sectionTitle: {
    display: 'flex',
    justifyContent: 'center',
    width:'100%',
    backgroundColor: theme.palette.grey[300],
    padding: '0.25rem 0'
  }, 
  sectionContent: {
    margin: '0.35rem'
  },
  sectionInput: {
    margin: '0.35rem'
  }
}));


function UpdateMerchantAboutForm() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const {authToken} = useContext(AuthContext);

  const about = useSelector(store => store.currentUser.about);

  const [values, setValues] = useState({
    headline: '',
    about: '',
    logo_wide_url: '',
    logo_narrow_url: ''
  });

  useEffect(() => {
    dispatch(fetchMerchantProfile());
  }, [dispatch]);

  useEffect(() => {
    setValues({
      headline: (about) ? about.headline : '',
      about: (about) ? about.about : '',
      logo_wide_url: (about) ? about.logo_wide_url : '',
      logo_narrow_url: (about) ? about.logo_narrow_url : ''
    })
  }, [about]);


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: This isn't a good permanent solution but to move things along this has been implemented in this manner
    try {
      if (about.id) {
        await apiOpus.updateMerchantAbout(values);
        history.push(`/merchants/${authToken.id}`);
      } else {
        await apiOpus.createMerchantAbout(values);
        history.push(`/merchants/${authToken.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    history.push(MERCHANT_ACCOUNT_PROFILE_PATH);
  };

  const renderBanner = () => {
    if (!about || !about.logo_wide_url || about.logo_wide_url.length <= 0) {
      return (
        <Grid item xs={12} className={classes.vSection}>
          <Typography className={classes.sectionTitle} variant="h6">Banner Image</Typography>
          <Typography className={classes.sectionContent} variant="subtitle2">No Banner Image Provided</Typography>
          <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                <OutlinedInput
                  id="merchant-banner-url"
                  className={classes.sectionInput}
                  value={values.logo_wide_url}
                  onChange={handleChange('logo_wide_url')}
                  aria-describedby="merchant-banner-url-helper-text"
                  inputProps={{
                    'aria-label': 'banner-url',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="merchant-banner-url-helper-text">Banner Image URL</FormHelperText>
            </FormControl>
        </Grid>
      )
    } else {
      // setValues({...values, logo_wide_url: about.logo_wide_url});
      return (
        <Grid item xs={12} className={classes.vSection}>
          <Typography className={classes.sectionTitle} variant="h6">Banner Image</Typography>
          <img className={classes.storeBannerImg} src={about.logo_wide_url} alt="Store Banner"></img>
          <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                <OutlinedInput
                  id="merchant-banner-url"
                  className={classes.sectionInput}
                  value={values.logo_wide_url}
                  onChange={handleChange('logo_wide_url')}
                  aria-describedby="merchant-banner-url-helper-text"
                  inputProps={{
                    'aria-label': 'banner-url',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="merchant-banner-url-helper-text">Banner Image URL</FormHelperText>
            </FormControl>
        </Grid>
      )
    };
  };

  const renderHeadline = () => {
    if (!about || !about.headline || about.headline.length <= 0) {
      return (
        <Grid item xs={12} className={classes.vSection}>
          <Typography className={classes.sectionTitle} variant="h6">Headline Text</Typography>
          <Typography className={classes.sectionContent} variant="subtitle2">No Headline Text Provided</Typography>
          <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                <OutlinedInput
                  id="merchant-headline"
                  className={classes.sectionInput}
                  value={values.headline}
                  onChange={handleChange('headline')}
                  aria-describedby="merchant-headline-helper-text"
                  inputProps={{
                    'aria-label': 'headline',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="merchant-headline-helper-text">Header Text</FormHelperText>
            </FormControl>
        </Grid>
      )
    } else {
      return (
        <Grid item xs={12} className={classes.vSection}>
          <Typography className={classes.sectionTitle} variant="h6">Headline Text</Typography>
          <Typography className={classes.sectionContent} variant="subtitle2">{about.headline}</Typography>
          <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                <OutlinedInput
                  id="merchant-headline"
                  className={classes.sectionInput}
                  value={values.headline}
                  onChange={handleChange('headline')}
                  aria-describedby="merchant-headline-helper-text"
                  inputProps={{
                    'aria-label': 'headline',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="merchant-headline-helper-text">Header Text</FormHelperText>
            </FormControl>
        </Grid>
      )
    };
  };

  const renderAbout = () => {
    if (!about || !about.about || about.about.length <= 0) {
      return (
        <Grid item xs={12} className={classes.vSection}>
          <Typography className={classes.sectionTitle} variant="h6">Your Story</Typography>
          <Typography className={classes.sectionContent} variant="subtitle2">No Story Provided</Typography>
          <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                <OutlinedInput
                  multiline
                  id="merchant-about"
                  className={classes.sectionInput}
                  value={values.about}
                  onChange={handleChange('about')}
                  aria-describedby="merchant-about-helper-text"
                  inputProps={{
                    'aria-label': 'about',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="merchant-about-helper-text">About Text</FormHelperText>
            </FormControl>
        </Grid>
      )
    } else {
      return (
        <Grid item xs={12} className={classes.vSection}>
          <Typography className={classes.sectionTitle} variant="h6">Your Story</Typography>
          <Typography className={classes.sectionContent} variant="subtitle2">{about.about}</Typography>
          <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                <OutlinedInput
                  multiline
                  id="merchant-about"
                  className={classes.sectionInput}
                  value={values.about}
                  onChange={handleChange('about')}
                  aria-describedby="merchant-about-helper-text"
                  inputProps={{
                    'aria-label': 'about',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="merchant-about-helper-text">About Text</FormHelperText>
            </FormControl>
        </Grid>
      )
    };
  };

  const renderThumbnail = () => {
    if (!about || !about.logo_narrow_url || about.logo_narrow_url.length <= 0) {
      return (
        <Grid item xs={12} className={classes.vSection}>
          <Typography className={classes.sectionTitle} variant="h6">Thumbnail Image</Typography>
          <Typography className={classes.sectionContent} variant="subtitle2">No Thumbnail Provided</Typography>
          <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                <OutlinedInput
                  id="merchant-thumbnail-url"
                  className={classes.sectionInput}
                  value={values.logo_narrow_url}
                  onChange={handleChange('logo_narrow_url')}
                  aria-describedby="merchant-thumbnail-url-helper-text"
                  inputProps={{
                    'aria-label': 'thumbnail-url',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="merchant-thumbnail-url-helper-text">Thumbnail Image URL</FormHelperText>
            </FormControl>
        </Grid>
      )
    } else {
      return (
        <Grid item xs={12} className={classes.vSection}>
          <Typography className={classes.sectionTitle} variant="h6">Thumbnail Image</Typography>
          <img className={classes.thumbnailImg} src={about.logo_narrow_url} alt="Store Thumbnail"></img>
          <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
                <OutlinedInput
                  id="merchant-thumbnail-url"
                  className={classes.sectionInput}
                  value={values.logo_narrow_url}
                  onChange={handleChange('logo_narrow_url')}
                  aria-describedby="merchant-thumbnail-url-helper-text"
                  inputProps={{
                    'aria-label': 'thumbnail-url',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="merchant-thumbnail-url-helper-text">Thumbnail Image URL</FormHelperText>
            </FormControl>
        </Grid>
      )
    };
  };


  return (
    <Container>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h4" noWrap>
            Update Store Page
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            {renderBanner()}
            {renderHeadline()}
            {renderAbout()}
            {renderThumbnail()}
            <Grid item xs={12}>
              <Button type="submit" aria-label="update merchant store details" variant="contained" color="primary">
                  Update Store Details
              </Button>
            </Grid>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Link href="#" onClick={handleCancel}>Cancel</Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default UpdateMerchantAboutForm;