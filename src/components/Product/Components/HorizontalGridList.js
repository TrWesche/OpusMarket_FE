import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  }, 
  gridTile: {
      cursor: "pointer",
      maxHeight: '80px'
  }
}));



export default function HorizontalGridList({tileData, handleTileClick}) {
  const classes = useStyles();

  if(tileData && tileData.length > 0) {
    return (
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={4.5} cellHeight="auto">
            {tileData.map((tile) => (
              <GridListTile key={tile.id} className={classes.gridTile} rows={1} onClick={handleTileClick}>
                <img src={tile.url} alt={tile.alt_text} className={classes.gridImg}/>
              </GridListTile>
            ))}
          </GridList>
        </div>
      );
  } else {
      return (
          <p></p>
      )
  }

}