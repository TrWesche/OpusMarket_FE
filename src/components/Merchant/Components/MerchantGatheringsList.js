import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Avatar
} from '@material-ui/core';
import {
    Event
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1, 
    backgroundColor: theme.palette.grey[100],
  },
  listItem: {
    display: 'flex',
    flexGrow: 1
  },
  inline: {
    display: 'inline',
  },
}));

export default function MerchantGatheringsList({gatherings}) {
    const classes = useStyles();
    
    // Should return image with highest weight in the future
    const renderImage = (gathering) => {
        if (gathering.images[0].url) {
          return (
            <ListItemAvatar>
                <Avatar alt={gathering.images[0].alt_text} src={gathering.images[0].url} />
            </ListItemAvatar>
          )
        } else {
          return (
            <ListItemIcon>
                <Event />    
            </ListItemIcon>
          )
        }
    };


    return (
        <List className={classes.root}>
        {gatherings.map((gathering, index) => (
            <ListItem alignItems="flex-start" className={classes.listItem}>
                {renderImage(gathering)}
                <ListItemText
                primary={gathering.title}
                secondary={
                    <React.Fragment>
                        {gathering.description.substr(0, 50)}
                    </React.Fragment>
                }
                />
            </ListItem>
        ))}
        </List>
  );
}
