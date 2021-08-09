import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  makeStyles,
  CssBaseline,
} from "@material-ui/core";
import LoginCard from "./LoginCard";
import TeacherHome from "./teacher/TeacherHome";
import AdminHome from "./admin/AdminHome"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import userContext from "../context/userContext";
import axios from "axios";
import { objIsEmpty } from "../utilities";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
}));

const App = () => {
  const [user, setUser] = useState({});

  useEffect(async () => {
    console.log(user);
    const { data } = await axios.get("/api/user/auth");
    if (objIsEmpty(user) && !objIsEmpty(data)) {
      setUser(data);
    }
  }, []);

  const logout = async () => {
    const response = await axios.delete("/api/user/logout");
    if (response.status === 204) {
      setUser({});
    }
  };

  const classes = useStyles();

  return (
    <userContext.Provider value={[user, setUser]}>
      <div className={classes.root}>
        <Router>
          <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <Typography className={classes.title} variant="h5" noWrap>
                Linkage
              </Typography>
              <Button color="inherit">
                <NavLink to="/">Home</NavLink>
              </Button>
              <Button color="inherit">
                <NavLink to="/about">About</NavLink>
              </Button>
              {objIsEmpty(user) ? (
                <Button color="inherit">
                  <NavLink to="/login">Login</NavLink>
                </Button>
              ) : (
                <Button color="inherit" onClick={logout}>
                  <NavLink to="#">Logout</NavLink>
                </Button>
              )}
            </Toolbar>
          </AppBar>

          <CssBaseline />
          <Switch>
            <Route path="/login">
              <div className={classes.loginCard}>
                <LoginCard />
              </div>
            </Route>
            <Route path="/about">About</Route>
            <Route path="/teacher">
              <TeacherHome />
            </Route>
            <Route path="/">{(!objIsEmpty(user) && user.RoleID === 1) ? <AdminHome /> : <div>Home</div>}</Route>
          </Switch>
        </Router>
      </div>
    </userContext.Provider>
  );
};

export default App;
