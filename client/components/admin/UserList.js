import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { AccountCircle, Check, Close, Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";
import { getRoleName } from "../../utilities";
import {
  Switch,
  FormControlLabel,
  FormGroup,
  ListSubheader,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  odd: {},
  even: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const UserList = (props) => {
  const [hideInactiveUsers, setHideInactiveUsers] = useState(true);
  const { users, activateUser, deactivateUser, manageSingleUser } = props;
  const classes = useStyles();

  const getActiveStatus = (isActive) => {
    if (isActive === 1) return "Activated";
    return "Deactivated";
  };

  const getAdministrators = users.filter((user) => user.RoleID === 1);

  const getTeachers = users.filter((user) => user.RoleID === 2);

  const getStudents = users.filter((user) => user.RoleID === 3);

  const getParents = users.filter((user) => user.RoleID === 4);

  return (
    <div>
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              checked={hideInactiveUsers}
              onChange={(evt) => setHideInactiveUsers(evt.target.checked)}
            />
          }
          label="Hide Inactive Users"
        />
      </FormGroup>
      <List>
        <ListSubheader>Administrators</ListSubheader>
        {getAdministrators.map((user, idx) => {
          if (hideInactiveUsers) {
            if (user.Active === 0) return;
          }
          return (
            <ListItem
              key={user.UserID}
              className={idx % 2 === 1 ? classes.odd : classes.even}
            >
              <ListItemAvatar>
                <Avatar>
                  <AccountCircle />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${user.LastName}, ${user.FirstName}`}
                secondary={`${getRoleName(user.RoleID)} | ${getActiveStatus(
                  user.Active
                )}`}
              />
            </ListItem>
          );
        })}
        <ListSubheader>Teachers</ListSubheader>
        {getTeachers.map((user, idx) => {
          if (hideInactiveUsers) {
            if (user.Active === 0) return;
          }
          return (
            <ListItem
              key={user.UserID}
              className={idx % 2 === 1 ? classes.odd : classes.even}
            >
              <ListItemAvatar>
                <Avatar>
                  <AccountCircle />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${user.LastName}, ${user.FirstName}`}
                secondary={`${getRoleName(user.RoleID)} | ${getActiveStatus(
                  user.Active
                )}`}
              />
              <ListItemSecondaryAction>
                {user.Active === 0 ? (
                  <IconButton
                    edge="end"
                    onClick={() => activateUser(user.UserID)}
                  >
                    <Check />
                  </IconButton>
                ) : (
                  <div>
                    <IconButton
                      edge="end"
                      onClick={() => manageSingleUser(user.UserID)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => deactivateUser(user.UserID)}
                    >
                      <Close />
                    </IconButton>
                  </div>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
        <ListSubheader>Students</ListSubheader>
        {getStudents.map((user, idx) => {
          if (hideInactiveUsers) {
            if (user.Active === 0) return;
          }
          return (
            <ListItem
              key={user.UserID}
              className={idx % 2 === 1 ? classes.odd : classes.even}
            >
              <ListItemAvatar>
                <Avatar>
                  <AccountCircle />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${user.LastName}, ${user.FirstName}`}
                secondary={`${getRoleName(user.RoleID)} | ${getActiveStatus(
                  user.Active
                )}`}
              />
              <ListItemSecondaryAction>
                {user.Active === 0 ? (
                  <IconButton
                    edge="end"
                    onClick={() => activateUser(user.UserID)}
                  >
                    <Check />
                  </IconButton>
                ) : (
                  <div>
                    <IconButton
                      edge="end"
                      onClick={() => manageSingleUser(user.UserID)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => deactivateUser(user.UserID)}
                    >
                      <Close />
                    </IconButton>
                  </div>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
        <ListSubheader>Parents</ListSubheader>
        {getParents.map((user, idx) => {
          if (hideInactiveUsers) {
            if (user.Active === 0) return;
          }
          return (
            <ListItem
              key={user.UserID}
              className={idx % 2 === 1 ? classes.odd : classes.even}
            >
              <ListItemAvatar>
                <Avatar>
                  <AccountCircle />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${user.LastName}, ${user.FirstName}`}
                secondary={`${getRoleName(user.RoleID)} | ${getActiveStatus(
                  user.Active
                )}`}
              />
              <ListItemSecondaryAction>
                {user.Active === 0 ? (
                  <IconButton
                    edge="end"
                    onClick={() => activateUser(user.UserID)}
                  >
                    <Check />
                  </IconButton>
                ) : (
                  <div>
                    <IconButton
                      edge="end"
                      onClick={() => manageSingleUser(user.UserID)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => deactivateUser(user.UserID)}
                    >
                      <Close />
                    </IconButton>
                  </div>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default UserList;
