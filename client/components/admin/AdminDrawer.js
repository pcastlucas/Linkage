import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Drawer,
    Toolbar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ClassIcon from "@material-ui/icons/Class";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Switch, Route, NavLink } from "react-router-dom";
import RegisterCard from "./RegisterCard";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: "auto",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
}));

const AdminDrawer = () => {
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
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <NavLink to="/admin/register">
                            <ListItem button>
                                <ListItemIcon>
                                    <PersonAddIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Register a new User"} />
                            </ListItem>
                        </NavLink>
                        <ListItem button>
                            <ListItemIcon>
                                <ChatIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Posts"} />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <ClassIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Classwork"} />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <HomeWorkIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Homework"} />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <AssignmentTurnedInIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Projects"} />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Exams"} />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route path="/admin/register">
                        <RegisterCard />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default AdminDrawer;
