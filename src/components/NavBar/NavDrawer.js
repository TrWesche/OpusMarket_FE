import React from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemText,
    IconButton,
    Typography
} from '@material-ui/core';
import {
    Menu as MenuIcon
} from '@material-ui/icons';
import {
  CATALOG_BROWSE_PATH,
  MERCHANTS_BROWSE_PATH
} from '../../routes/_pathDict';


const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
  sectionHeader: {
    padding: '8px 16px 0px 16px'
  }
});

export default function NavDrawer() {
  const history = useHistory();

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const featuredList = [
    {name: 'Products', destination: `${CATALOG_BROWSE_PATH}?featured=true&site_wide=true`},
    {name: 'Creators', destination: `${MERCHANTS_BROWSE_PATH}?featured=true`},
    {name: 'Top Sellers', destination: `${CATALOG_BROWSE_PATH}?sort=purchases-desc`}
  ]


  const departmentList = [
    {name: 'Clothing', destination: `${CATALOG_BROWSE_PATH}?t=clothes`},
    {name: 'Furniture', destination: `${CATALOG_BROWSE_PATH}?t=furniture`},
    {name: 'Art', destination: `${CATALOG_BROWSE_PATH}?t=art`}
  ]

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleMenuSelection = (destination) => {
    history.push(destination);
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    > 
      <Typography variant="h5" className={classes.sectionHeader}>Featured</Typography>
      <List>
        {featuredList.map((feature) => (
          <ListItem button key={`NavDrawer-${feature.name}`}>
            <ListItemText primary={feature.name} onClick={() => handleMenuSelection(feature.destination)}/>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Typography variant="h5" className={classes.sectionHeader}>Shop By Department</Typography>
      <List>
        {departmentList.map((department) => (
          <ListItem button key={department.name}>
            <ListItemText primary={department.name} onClick={() => handleMenuSelection(department.destination)}/>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment key={'left'}>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer('left', true)}
            >
                <MenuIcon />
            </IconButton>

            <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                {list('left')}
            </Drawer>
        </React.Fragment>
    </div>
  );
}
