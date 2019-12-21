import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
    Box, Container, Grid,
    GridList, GridListTile, ListSubheader, GridListTileBar, Paper,
    IconButton,
} from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

////////////////////////////////////////////////////////////////////////////////
function TitlebarGridList() {
    const classes = useStyles();

    const tileData = [
        { img: '/images/pic02.jpg', title: 'Image', author: 'author' },
        { img: '/images/pic03.jpg', title: 'Image', author: 'author' },
        { img: '/images/pic04.jpg', title: 'Image', author: 'author' },
        { img: '/images/pic05.jpg', title: 'Image', author: 'author' },
        // {img: '/images/pic06.jpg', title: 'Image', author: 'author' },
        // {img: '/images/pic07.jpg', title: 'Image', author: 'author' },
    ];

    return (
        <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">TitleBarGridList</ListSubheader>
                </GridListTile>
                {tileData.map(tile => (
                    <GridListTile key={tile.img}>
                        <a href="/examples/material-ui">
                            <img src={tile.img} alt={tile.title} />
                        </a>
                        <GridListTileBar
                            title={tile.title}
                            subtitle={<span>by: {tile.author}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

////////////////////////////////////////////////////////////////////////////////
function NestedGrid() {
    const classes = useStyles();

    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid container item xs={12} spacing={1}>
                    <FormRow txt="NestedGrid spacing 1" />
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    <FormRow txt="NestedGrid spacing 2" />
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <FormRow txt="NestedGrid spacing 3" />
                </Grid>
            </Grid>
        </div>
    );
}

// class Example extends React.Component {
const Example = function () {

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Material UI</h1>

            <hr />

            <h2>Layout</h2>
            <Box style={{ backgroundColor: "yellow" }} color="text.primary">
                <p>Box Layout</p>
            </Box>
            <Container style={{ backgroundColor: "yellow" }} maxWidth="sm">
                <p>Container Layout: maxWidth sm</p>
            </Container>

            <NestedGrid />

            <br />

            <TitlebarGridList />

            <br />
            <a href="https://material-ui.com/components/grid/">For More Layouts...</a>

            <hr />

        </div>
    )
}

export default Example;