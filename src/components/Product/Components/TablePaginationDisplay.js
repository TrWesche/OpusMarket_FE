import React from 'react';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow,
    Grid,
    Typography
} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';
import TablePaginationControls from './TablePaginationControls';
import { DateTime } from 'luxon';

const useStyles = makeStyles((theme) => ({
    table: {
        width: '100%'
    },
    metaColumn: {
        backgroundColor: "#FFF"
    },
    title: {
        fontSize: '1.25rem',
        fontWeight: '400'
    },
    rating: {
        color: 'darkred'
    },
    user: {
        fontStyle: 'italic'
    },
    bodyColumn: {
        padding: '0.25rem'
    },
}));


export default function TablePaginationDisplay({handleChangePage, handleChangeRowsPerPage, tableAttributes, tableRows}) {
    const classes = useStyles();
    const {page, rowsPerPage} = tableAttributes;
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableRows.length - page * rowsPerPage);

    return (
      <TableContainer>
        <Table className={classes.table} aria-label="paginated reviews table">
          <TableBody>
            {(rowsPerPage > 0
                ? tableRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : tableRows
            ).map((row) => (
                <TableRow key={`review-${row.id}`}>
                    <TableCell>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={3} className={classes.metaColumn}>
                                <Typography className={classes.title}>{row.title}</Typography>
                                <Typography>Scored: <span className={classes.rating}>{row.rating}</span> / 5</Typography>

                                <Typography className={classes.user}>Reviewed By:{row.first_name} - {DateTime.fromISO(tableRows[0].review_dt).toLocaleString()}</Typography>
                            </Grid>
                            <Grid item xs={12} md={9} className={classes.bodyColumn}>
                                <Typography className={classes.body}>{row.body}</Typography>
                            </Grid>
                        </Grid>
                    </TableCell>
                </TableRow>
            ))}
  

          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={tableRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationControls}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    );
  }