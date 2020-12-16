import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Box,
    Grid,
    Tabs,
    Tab
} from '@material-ui/core';
import SwipeableViews from "react-swipeable-views";
import FeaturedProductsStepper from "./FeaturedProductsStepper";
import MerchantBiosStepper from "./MerchantBiosStepper";
import MerchantGatheringsList from "./MerchantGatheringsList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #EEE',
    height: '515px'
  },
  panel: {
    height: '465px'
  }
}));

export default function MerchantHeroContainer({gatherings, featured_products, bios}) {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const TabList = [];

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleChangeIndex = (index) => {
      setValue(index);
    };

    const createTabs = () => {
      if(featured_products[0].id) {
        const TabData = {};
        TabData.selector = ({label:"Featured Products", ...a11yProps(TabList.length)});
        TabData.panel = ({ 
          index: TabList.length, 
          dir:'ltr', 
          child: <FeaturedProductsStepper featuredProducts={featured_products} />
        });

        TabList.push(TabData);
      };

      if(gatherings[0].gathering_id) {
        const TabData = {};
        TabData.selector = ({label:"Gatherings", ...a11yProps(TabList.length)});
        TabData.panel = ({ 
          index: TabList.length, 
          dir:'ltr', 
          child: <MerchantGatheringsList gatherings={gatherings} />
        });

        TabList.push(TabData);
      };

      if(bios[0].name) {
        const TabData = {};
        TabData.selector = ({label:"Biographies", ...a11yProps(TabList.length)});
        TabData.panel = ({ 
          index: TabList.length, 
          dir:'ltr', 
          child: <MerchantBiosStepper merchantBios={bios} />
        });

        TabList.push(TabData);
      };
    };
    createTabs();

    const renderTabs = (tabs) => {
      return (
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="merchant featured information tab window"
        >
          {tabs.map((tab) => {
            return (
              <Tab key={tab.selector.id} {...tab.selector} />
            )
          })}

        </Tabs>
      );
    };

    const renderPanels = (tabs) => {
      return (
        <SwipeableViews
          axis='x'
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {tabs.map((tab) => {
            return (
              <TabPanel value={value} index={tab.panel.index} key={`tab-panel-${tab.panel.index}`} dir={tab.panel.dir} className={classes.panel}>
                {tab.panel.child}
              </TabPanel>
            )
          })}
        </SwipeableViews>
      );
    };

    return (
      <Grid container className={classes.root} justify="center">
        <AppBar position="static" color="default" elevation={0}>
          {renderTabs(TabList)}
        </AppBar>

        {renderPanels(TabList)}
      </Grid>
  );
}
