import React, { useState } from 'react';
// import { useDispatch } from "react-redux";
import { 
    Grid,
    Typography
} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';
import TablePaginationDisplay from './TablePaginationDisplay';


const useStyles = makeStyles((theme) => ({
    hSection: {
        padding: '0 1rem',
        border: 'none'
    },
    sectionHeader: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
        textAlign: 'left'
    },
    noReviewText: {
        width: "100%",
        textAlign: 'center'
    },
    writeReview: {
        textAlign: 'right'
    }
}));


export default function ProductReviewsContainer({reviews}) {
    const classes = useStyles();
    // const dispatch = useDispatch();

    const [tableAttributes, setTableAttributes] = useState({
        count: 0, 
        page: 0, 
        rowsPerPage: 10
    })

    const handleChangePage = (e, newPage) => {
        e.preventDefault();

        setTableAttributes({...tableAttributes, page: newPage});
      };
    
    const handleChangeRowsPerPage = (e) => {
        e.preventDefault();
        
        setTableAttributes({...tableAttributes, rowsPerPage: e.target.value, page: 0});
    };

    const renderReviews = () => {
        if(reviews && reviews.length > 0) {
            return (
                <TablePaginationDisplay 
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    tableAttributes={tableAttributes}
                    tableRows={reviews}
                />
            )
        } else {
            return (
                <p className={classes.noReviewText}>This item has not been been reviewed yet.</p>
            )
        }
    };

    // TODO: Add review
    return (
        <Grid container className={classes.hSection}  spacing={1}>
            <Grid item xs={12}>
                <Typography className={classes.sectionHeader}>Customer Reviews</Typography>
            </Grid>
            <Grid item xs={12}>
                <p className={classes.writeReview}>Placeholder - Write A Review</p>
            </Grid>
            <Grid item xs={12}>
                {renderReviews()}
            </Grid>
        </Grid>
    );
}
