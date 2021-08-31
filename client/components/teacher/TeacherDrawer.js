import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import ClassIcon from "@material-ui/icons/Class";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import HomeIcon from '@material-ui/icons/Home';
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import AssignmentIcon from "@material-ui/icons/Assignment";

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
}));

const TeacherDrawer = (props) => {
  const { setPage } = props;

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
            <ListItem button onClick={() => setPage("home")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
            <ListItem button onClick={() => setPage("posts")}>
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
    </div>
  );
};

export default TeacherDrawer;
