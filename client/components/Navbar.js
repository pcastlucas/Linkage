import React, { useContext } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    makeStyles,
} from "@material-ui/core";
import { NavLink, } from "react-router-dom";
import { objIsEmpty } from "../utilities";
import userContext from "../context/userContext";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    title: {
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
    },
    loginCard: {
        verticalAlign: "center",
        padding: theme.spacing(25, 50),
        height: 200,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    link: {
        color: "white"
    }
}));

const Navbar = () => {
    const [user, setUser] = useContext(userContext);

    const logout = async () => {
        const response = await axios.delete("/api/user/logout");
        if (response.status === 204) {
            setUser({});
        }
    };

    const classes = useStyles();

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Typography className={classes.title} variant="h5" noWrap>
                    Linkage
                </Typography>
                <Button color="secondary">
                    <NavLink className={classes.link} to="/">Home</NavLink>
                </Button>
                <Button color="secondary">
                    <NavLink className={classes.link} to="/about">About</NavLink>
                </Button>
                {objIsEmpty(user) ? (
                    <Button color="secondary">
                        <NavLink className={classes.link} to="/login">Login</NavLink>
                    </Button>
                ) : (
                    <Button color="secondary" onClick={logout}>
                        <NavLink className={classes.link} to="#">Logout</NavLink>
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;