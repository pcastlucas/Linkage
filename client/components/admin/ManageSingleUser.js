import React, { useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
} from "@material-ui/core";
import { getRoleName } from "../../utilities";
import { Save, ArrowBack } from "@material-ui/icons";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  field: {
    padding: theme.spacing(1),
  },
  saveBtn: {
    display: "flex",
    justifyContent: "flex-end",
  },
  backBtn: {
    padding: theme.spacing(2),
  },
}));

const ManageSingleUser = (props) => {
  const { user, manageSingleUser, updateUser } = props;

  const [firstName, setFirstName] = useState(user.FirstName);
  const [lastName, setLastName] = useState(user.LastName);
  const [emailAddress, setEmailAddress] = useState(user.EmailAddress);
  const [roleID, setRoleID] = useState(user.RoleID);

  const [openAlert, setOpenAlert] = useState(false);

  const classes = useStyles();

  const saveBasicInfo = async () => {
    const { data } = await axios.put("/api/user/update", {
      user: {
        userID: user.UserID,
        firstName,
        lastName,
        emailAddress,
        roleID,
      },
    });

    setOpenAlert(true);
    updateUser(data.UserID);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <div>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={6}>
          <div className={classes.backBtn}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<ArrowBack />}
              onClick={() => manageSingleUser(-1)}
            >
              Back
            </Button>
          </div>
          <Paper variant="outlined" className={classes.paper}>
            <div className={classes.field}>
              <TextField
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(evt) => setFirstName(evt.target.value)}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(evt) => setLastName(evt.target.value)}
              />
            </div>
            <div className={classes.field}>
              <TextField
                label="Email"
                variant="outlined"
                value={emailAddress}
                onChange={(evt) => setEmailAddress(evt.target.value)}
              />
            </div>
            <div className={classes.field}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  User Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={roleID}
                  onChange={(evt) => setRoleID(evt.target.value)}
                  label="User Type"
                >
                  <MenuItem value={2}>Teacher</MenuItem>
                  <MenuItem value={3}>Student</MenuItem>
                  <MenuItem value={4}>Parent</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.saveBtn}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.saveBtn}
                startIcon={<Save />}
                onClick={saveBasicInfo}
              >
                Save
              </Button>
            </div>
            <Snackbar
              open={openAlert}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="success">
                Sucessfully Saved!
              </Alert>
            </Snackbar>
          </Paper>
        </Grid>
        <Grid item xs={6}>

        </Grid>
      </Grid>
    </div>
  );
};

export default ManageSingleUser;
