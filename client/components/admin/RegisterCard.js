import React, { useState, useContext } from "react";
import {
    Card,
    CardContent,
    Typography,
    makeStyles,
    TextField,
    Button,
    InputAdornment,
} from "@material-ui/core";
import { AccountCircle, VpnKeyRounded } from "@material-ui/icons";
import axios from "axios";
import userContext from "../../context/userContext";
import { Redirect } from "react-router";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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
        marginTop: theme.spacing(2),
    },
}));

const RegisterCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidMsg, setInvalidMsg] = useState(false);
    const [user, setUser] = useContext(userContext);
    const [userType, setUserType] = useState(2);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const classes = useStyles();

    const handleLogin = async () => {
        if (userType && email && password) {
            try {
                const { data } = await axios.put("/api/user/register", {
                    firstName,
                    lastName,
                    username: email,
                    password,
                    userType
                });
                console.log(data)
                setInvalidMsg(false);
            } catch (error) {
                setInvalidMsg(true);
            }
        } else {
            setInvalidMsg(true);
        }
    };

    return (
        <div>
            {user.RoleID !== 1 && <Redirect to="/home" />}

            <Card className={classes.root} variant="outlined">
                <CardContent className={classes.content}>
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
                            label="Password"
                            variant="outlined"
                            type="text"
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
                    <div>
                        <Button
                            color="primary"
                            variant="contained"
                            className={classes.field}
                            size="large"
                            onClick={handleLogin}
                        >
                            Register new User
                        </Button>
                    </div>
                    {invalidMsg && (
                        <div className={classes.field}>
                            <Typography>Invalid email or password</Typography>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterCard;
