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
import userContext from "../context/userContext";
import { Redirect } from "react-router";
import { objIsEmpty } from "../utilities";
import { NavLink } from "react-router-dom";

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

const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalidMsg, setInvalidMsg] = useState(false);
  const [user, setUser] = useContext(userContext);

  const classes = useStyles();

  const handleLogin = async () => {
    if (email && password) {
      try {
        const { data } = await axios.put("/api/user/login", {
          username: email,
          password,
        });
        setUser(data);
      } catch (error) {
        console.log(error);
        setInvalidMsg(true);
      }
    } else {
      setInvalidMsg(true);
    }
  };

  return (
    <div>
      {!objIsEmpty(user) && <Redirect to="/home" />}

      <Card className={classes.root} variant="outlined">
        <CardContent className={classes.content}>
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
          <div>
            <Button
              color="primary"
              variant="contained"
              className={classes.field}
              size="large"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
          {invalidMsg && (
            <div className={classes.field}>
              <Typography>Invalid email or password</Typography>
            </div>
          )}
          <div className={classes.field}>
            <NavLink to="/register">Register a new account</NavLink>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginCard;
