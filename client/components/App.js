import React, { useState, useEffect } from "react";
import {
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
} from "react-router-dom";
import userContext from "../context/userContext";
import axios from "axios";
import { objIsEmpty } from "../utilities";
import Navbar from "./Navbar";
import RegisterCard from "./RegisterCard"

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
  card: {
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

  const classes = useStyles();

  return (
    <userContext.Provider value={[user, setUser]}>
      <div className={classes.root}>
        <Router>
          <Navbar />
          <CssBaseline />
          <Switch>
            <Route path="/login">
              <div className={classes.card}>
                <LoginCard />
              </div>
            </Route>
            <Route path="/register">
              <div className={classes.card}>
                <RegisterCard />
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
