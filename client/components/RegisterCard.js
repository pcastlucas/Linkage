import React, { useState, useContext } from "react";
import userContext from "../context/userContext";
import { Redirect } from "react-router";
import { objIsEmpty } from "../utilities";
import {
    Card,
    CardContent,
    Typography,
    makeStyles,
    TextField,
    Button,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@material-ui/core";
import { AccountCircle, VpnKeyRounded } from "@material-ui/icons";
import axios from "axios";

const RegisterCard = () => {
    const [user, setUser] = useContext(userContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msgShow, setMsgShow] = useState(false);
    const [msg, setMsg] = useState("");
    const [userType, setUserType] = useState(2);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    const handleRegister = async () => {
        if (password === verifyPassword) {
            if (userType && firstName && lastName && email && password && verifyPassword) {
                try {
                    await axios.put("/api/user/register", {
                        firstName,
                        lastName,
                        username: email,
                        password,
                        userType
                    });
                    setMsgShow(true);
                    setMsg(`Successfully registered ${firstName} ${lastName}`);
                } catch (error) {
                    console.log(error);
                    setMsgShow(true);
                    if (error.response.status === 400) {
                        setMsg("Email already registered.");
                    } else {
                        setMsg("Something went wrong trying to register your account.");
                    }
                }
            } else {
                setMsgShow(true);
                setMsg("You did not enter a required field.");
            }
        } else {
            setMsg("Passwords do not match.")
            setMsgShow(true);
        }
    };

    const useStyles = makeStyles((theme) => ({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: "inline-block",
            margin: "0 2px",
            transform: "scale(0.8)",
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        content: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        field: {
            marginTop: theme.spacing(2)
        },
    }));

    const classes = useStyles();

    return (
        <div>
            {!objIsEmpty(user) && <Redirect to="/home" />}

            <Card className={classes.root} variant="outlined">
                <CardContent className={classes.content}>
                    <div className={classes.field}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">User Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={userType}
                                onChange={(evt) => setUserType(evt.target.value)}
                                label="User Type"
                            >
                                <MenuItem value={2}>Teacher</MenuItem>
                                <MenuItem value={3}>Student</MenuItem>
                                <MenuItem value={4}>Parent</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.field}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(evt) => setEmail(evt.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className={classes.field}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            value={firstName}
                            onChange={(evt) => setFirstName(evt.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className={classes.field}>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            value={lastName}
                            onChange={(evt) => setLastName(evt.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className={classes.field}>
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={(evt) => setPassword(evt.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyRounded />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className={classes.field}>
                        <TextField
                            label="Verify Password"
                            variant="outlined"
                            type="password"
                            value={verifyPassword}
                            onChange={(evt) => setVerifyPassword(evt.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyRounded />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div>
                        <Button
                            color="primary"
                            variant="contained"
                            className={classes.field}
                            size="large"
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </div>
                    {msgShow && (
                        <div className={classes.field}>
                            <Typography>{msg}</Typography>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default RegisterCard;