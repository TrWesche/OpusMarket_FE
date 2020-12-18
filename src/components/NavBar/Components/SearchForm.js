import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { 
    IconButton,
    FormControl,
    Input,
    InputAdornment,
    Select
    } from "@material-ui/core";
import { 
    Search as SearchIcon,} from "@material-ui/icons";
import { fade, makeStyles } from '@material-ui/core/styles';

import {
  CATALOG_BROWSE_PATH,
  MERCHANTS_BROWSE_PATH
} from "../../../routes/_pathDict";

const useStyles = makeStyles((theme) => {
    return (
        {
            searchForm: {
                display: 'flex',
                padding: theme.spacing(0.5),
                flexGrow: 1,
                borderRadius: theme.shape.borderRadius,
                backgroundColor: fade(theme.palette.common.white, 0.15),
                '&:hover': {
                    backgroundColor: fade(theme.palette.common.white, 0.25),
                },
                marginRight: theme.spacing(10),
                marginLeft: 0,
                width: '100%',
                [theme.breakpoints.up('sm')]: {
                    marginLeft: theme.spacing(10),
                    width: 'auto',
                },
            },
            selectorRoot: {
                display: 'flex',
                margin: theme.spacing(0, 2, 0, 0.5),
            },
            selectorInput: {
                display: 'flex',
                padding: theme.spacing(1, 1, 1, 1),
                borderRadius: theme.shape.borderRadius,
                width: '105px',
                textOverflow: 'ellipsis',
                color: theme.palette.primary.dark,
                backgroundColor: theme.palette.primary.contrastText
            },
            inputRoot: {
                display: 'flex',
                color: theme.palette.primary.contrastText,
                fontWeight: 'bold',
                width: '100%'
            },
            inputInput: {
                display: 'flex',
                padding: theme.spacing(1, 1, 1, 1),
                transition: theme.transitions.create('width'),
                width: '100%',
            }
        }
    )
});

function SearchForm() {
  const [searchValues, setSearchValues] = useState({
    s: '',
    type: CATALOG_BROWSE_PATH
  });

  const classes = useStyles();
  const history = useHistory();

  const handleSearchChange = (prop) => (event) => {
    setSearchValues({ ...searchValues, [prop]: event.target.value });
  };

  const handleChangeSearchCategory = (prop) => (event) => {
    console.log("Triggered Change Search Category", prop)

    setSearchValues({ ...searchValues, [prop]: event.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const splitSearchVal = searchValues.s.split(" ");
    const preparedSearchValue = splitSearchVal.reduce((acc, subString) => {
      if(subString.length > 1) {
        if (acc.length === 0) {
          return subString;
        }
        return `${acc}+${subString}`;
      }
      return acc;
    }, "");

    if(preparedSearchValue.length === 0) {
      history.push(`${searchValues.type}`);
    } else {
      history.push(`${searchValues.type}?s=${preparedSearchValue}`);
    }

    setSearchValues({...searchValues, 's': ""});
  };

  return (
    <form className={classes.searchForm} onSubmit={handleSearch}>
        <FormControl className={classes.selectorRoot}>
            <Select
                native
                value={searchValues.type}
                onChange={handleChangeSearchCategory('type')}
                disableUnderline
                classes={{
                    root: classes.selectorInput
                }}
            >
                <option value={CATALOG_BROWSE_PATH}>Products</option>
                <option value={MERCHANTS_BROWSE_PATH}>Merchants</option>
            </Select>
        </FormControl>
        <FormControl className={classes.inputRoot}>
            <Input
                id="navbar-search"
                value={searchValues.s}
                onChange={handleSearchChange('s')}
                type="text"
                placeholder="Search..."
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                disableUnderline
                endAdornment = {
                    <InputAdornment position="end">
                        <IconButton 
                            aria-label="perform search"
                            type="submit"
                            size= "small"
                        >
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>  
    </form>
  );
}

export default SearchForm;