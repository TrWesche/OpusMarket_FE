import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container
} from '@material-ui/core';
import GatheringManagementCard from "./GatheringManagementCard";

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

function GatheringManagementList({gatherings, merchantId}) {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
          {gatherings.map((gathering, index) => (
            <GatheringManagementCard cardData={gathering} merchantId={merchantId} key={`merchant-${merchantId}-gathering-${gathering.gathering_id}`}/>
          ))}
        </Container>
  );
}

export default GatheringManagementList;