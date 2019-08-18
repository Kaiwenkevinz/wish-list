import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MediaCard from './MediaCard';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function NestedGrid(data) {

    const classes = useStyles();

    let content = data.data.map(wishItem => 
            <Grid item xs={4} key={wishItem.id}>
                <MediaCard item={wishItem}/>
            </Grid>
        )

    return (
        <div className={classes.root}>
        <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
                <React.Fragment>
                    {content}
                </React.Fragment>
            </Grid> 
        </Grid>
        </div>
    );
}