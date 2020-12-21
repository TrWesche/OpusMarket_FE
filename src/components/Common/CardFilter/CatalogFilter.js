import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
    Grid,
    List,
    ListSubheader,
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Button,
    // useTheme
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0.25rem 0.5rem 1rem 0.5rem',
        flexGrow: 1,
        backgroundColor: 'white',
        border: `1px solid #AAA`,
        maxHeight: 600,
        borderRadius: '0.2rem'
    },
    vSection: {
        display: 'flex',
        flexDirection: 'column'
    },
    list: {
        flexGrow: 1
    }
}));

function CatalogFilter ({featuredProducts, productMetas}) {
    const multiVariantQueryParams = new Set(['t', 'mid', 's']);
    const displayedQueryParams = new Set(['t', 'featured']);
    const categoryDisplayLookup = { 't': "Tags", 'featured': "Featured", 'mid': "Merchants"};
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();

    // Retrieve search parameters from compiled query string
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    const searchParams = new URLSearchParams(location.search);

    const [filterListChecked, setFilterListChecked] = useState({});
  
    const handleToggle = (section, item) => () => {
        const currentKey = filterListChecked[section];
        if (multiVariantQueryParams.has(section)) {
            const newArrayChecklist = currentKey.map((value) => {
                if(value.title === item) {
                    return ({...value, checked: !value.checked});
                } else {
                    return value;
                }
            })
            setFilterListChecked({...filterListChecked, [section]: newArrayChecklist});
        } else {
            setFilterListChecked({...filterListChecked, [section]: {...currentKey, checked: !currentKey.checked}})
        }
    }; 

    const handleSubmit = (e) => {
        e.preventDefault();
        const queryParamArray = [];

        Object.keys(filterListChecked).forEach((key) => {
            const currentValue = filterListChecked[key];
            if(Array.isArray(currentValue)) {
                const multiVariantQuery = [];

                currentValue.forEach((value) => {
                    if(value.title && value.checked) {
                        multiVariantQuery.push(value.title);
                    } else if (typeof(value) === "string") {
                        multiVariantQuery.push(value);
                    }
                })

                if (multiVariantQuery.length > 0) {
                    queryParamArray.push(`${key}=${multiVariantQuery.join("+")}`);
                }
            } else {
                if(currentValue.checked === true) {
                    if(currentValue.title === 'featured' && !Object.keys(filterListChecked).includes('mid')) {
                        queryParamArray.push(`${currentValue.title}=true`);
                        queryParamArray.push(`site_wide=true`);
                    } else {
                        queryParamArray.push(`${currentValue.title}=true`);
                    }
                }
            }
        })

        if (queryParamArray.length > 0) {
            history.push(`${location.pathname}?${queryParamArray.join("&")}`);
        } else {
            history.push(`${location.pathname}`);
        }
    };

    let lastSearchParameters = {};
    const ingestLastQueryParams = () => {
        lastSearchParameters = {};
        for (const [key, value] of searchParams) {
            if(multiVariantQueryParams.has(key)) {
                const splitVal = value.split(' ');
                lastSearchParameters[key] = splitVal;
            } else {
                lastSearchParameters[key] = [value];
            }
        }
    };

    const ingestFilterParameters = () => {
        const filterParameters = {};
        if (featuredProducts && featuredProducts.length > 0) {
            if (lastSearchParameters.featured) {
                filterParameters.featured = {title: "featured", display: "Featured", checked: true};
            } else {
                filterParameters.featured = {title: "featured", display: "Featured", checked: false};
            }
        }

        if (productMetas) {
            filterParameters.t = [];
            productMetas.forEach(meta => {
                if (lastSearchParameters.t && lastSearchParameters.t.includes(meta.title)) {
                    filterParameters.t.push({title: meta.title, display: meta.title, checked: true});
                } else {
                    filterParameters.t.push({title: meta.title, display: meta.title, checked: false});
                };
            })
        }

        if (lastSearchParameters.s) {
            filterParameters.s = lastSearchParameters.s;
        }

        if (lastSearchParameters.mid) {
            filterParameters.mid = lastSearchParameters.mid;
        }

        setFilterListChecked(filterParameters);
    };


    // Update search results on changes to the query list
    useEffect(() => {
        console.log("useEffect Triggered")
        ingestLastQueryParams();
        ingestFilterParameters();
    }, [location.search, featuredProducts, productMetas]);

    const renderListItem = (section, item, index=0) => {
        if (item.title) {
            return (
                <ListItem key={`${item.title}-${index}`} role={undefined} dense button onClick={handleToggle(section, item.title)}>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={item.checked}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': item.title }}
                        />
                    </ListItemIcon>
                    <ListItemText id={item.title} primary={`${item.display}`} />
                </ListItem>
            );
        }
    }

    const renderListSection = (section, data) => {
        if(displayedQueryParams.has(section)) {
            if(multiVariantQueryParams.has(section)) {
                return (
                    <Grid item xs={12}>
                        <List
                            component="nav"
                            aria-labelledby={`nested-list-subheader-site-${section}`}
                            subheader={
                            <ListSubheader component="div" id={`nested-list-subheader-site-${section}`}>
                                {categoryDisplayLookup[section]}
                            </ListSubheader>
                            }
                            className={classes.list}
                        >
                            {data.map((subVal, index) => {
                                return (
                                    <React.Fragment>
                                        {renderListItem(section, subVal, index)}
                                    </React.Fragment>
                                )
                            })}
                        </List>
                    </Grid>
                )
            } else {
                return (
                    <Grid item xs={12}>
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader-site-promotions"
                            subheader={
                            <ListSubheader component="div" id="nested-list-subheader-site-promotions">
                                {categoryDisplayLookup[section]}
                            </ListSubheader>
                            }
                            className={classes.list}
                        > 
                            {renderListItem(section, data)}
                        </List>
                    </Grid>
                )
            }
        }
    }
 
    const render = () => {
        if (Object.keys(filterListChecked).length <= 0) {
            return (
                <Grid container className={classes.vSection} spacing={2}>
                    <p>No Filter Parameters</p>
                </Grid>
            )
        } else {
            return (
                <Grid container className={classes.vSection} spacing={2}>
                    {Object.keys(filterListChecked).map((value) => {
                        return (
                            renderListSection(value, filterListChecked[value])
                        )
                    })}
                </Grid>
            );
        }
    }

    return (
        <Grid className={classes.root} item xs={12}>
            <form onSubmit={handleSubmit}>
                {render()}
                <Button type="submit" aria-label="apply selected filters" variant="contained" color="primary">
                    Apply
                </Button>
            </form>
        </Grid>
    )
}

export default CatalogFilter; 
