import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import useStyles from '../App/styles';
import Title from '../Title';

function Triagem() {
    const classes = useStyles();

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Title>Triagem</Title>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Triagem;