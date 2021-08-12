import React, { useState } from "react";
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
import ManageUsers from "./ManageUsers"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
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
    const [option, setOption] = useState([]);

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
                        <ListItem button onClick={() => setOption("manage-users")}>
                            <ListItemIcon>
                                <PersonAddIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Manage users"} />
                        </ListItem>
                        <ListItem button onClick={() => setOption("posts")}>
                            <ListItemIcon>
                                <ChatIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Posts"} />
                        </ListItem>
                        <ListItem button onClick={() => setOption("classwork")}>
                            <ListItemIcon>
                                <ClassIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Classwork"} />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon onClick={() => setOption("homework")}>
                                <HomeWorkIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Homework"} />
                        </ListItem>
                        <ListItem button onClick={() => setOption("projects")}>
                            <ListItemIcon>
                                <AssignmentTurnedInIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Projects"} />
                        </ListItem>
                        <ListItem button onClick={() => setOption("exams")}>
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
                {option === "manage-users" && <ManageUsers />}
            </div>
        </div>
    );
};

export default AdminDrawer;
