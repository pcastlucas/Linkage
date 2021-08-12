import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { AccountCircle } from "@material-ui/icons";
import {
    makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    odd: {

    },
    even: {
        backgroundColor: theme.palette.background.paper,
    }
}));

const UserList = (props) => {
    const users = props.users;
    const classes = useStyles();

    const getRoleName = (roleID) => {
        switch (roleID) {
            case 1:
                return "Administrator";
            case 2:
                return "Teacher";
            case 3:
                return "Student";
            case 4:
                return "Parent";
        }
    }

    const getActiveStatus = (isActive) => {
        if (isActive === 1) return "Activated";
        return "Deactivated";
    }

    return (
        <List>
            {users.map((user, idx) => (
                <ListItem key={user.UserID} className={idx % 2 === 1 ? classes.odd : classes.even}>
                    <ListItemAvatar>
                        <Avatar>
                            <AccountCircle />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${user.LastName}, ${user.FirstName}`}
                        secondary={`${getRoleName(user.RoleID)} | ${getActiveStatus(user.Active)}`}
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
}

export default UserList;