import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PetsIcon from '@material-ui/icons/Pets';
import PeopleIcon from '@material-ui/icons/People';
import FastfoodIcon from '@material-ui/icons/Fastfood';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function Navigation() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar} />
                <List>
                    <ListItem button component={NavLink} exact to="/">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/cats">
                        <ListItemIcon>
                            <PetsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cats" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/owners">
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Owners" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/foods">
                        <ListItemIcon>
                            <FastfoodIcon />
                        </ListItemIcon>
                        <ListItemText primary="Food" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
}
