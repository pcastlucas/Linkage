import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  makeStyles,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { ArrowBack, Save, Delete, PersonAdd } from "@material-ui/icons";
import SubjectDropdown from "./SubjectDropdown";
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
  odd: {},
  even: {
    backgroundColor: theme.palette.background.default,
  },
}));

const ManageSingleClassroom = (props) => {
  const {
    classroom,
    setSingleClassroom,
    manageSingleClassroom,
    updateClassroomList,
  } = props;
  const [subjectID, setSubjectID] = useState(classroom[0].SubjectID);
  const [teachers, setTeachers] = useState([]);
  const [teacherID, setTeacherID] = useState(classroom[0].TeacherID);
  const [roomNumber, setRoomNumber] = useState(classroom[0].RoomNumber);
  const [openAlert, setOpenAlert] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentID, setStudentID] = useState(0);
  const [studentsNotInClassroom, setStudentsNotInClassroom] = useState([]);
  const [disableAddStudent, setDisableAddStudent] = useState(false);
  const [gradeLevel, setGradeLevel] = useState(9);

  useEffect(async () => {
    const { data: teacherData } = await axios.get("/api/user/teachers");
    setTeachers(teacherData);

    await updateStudentList();
  }, []);

  useEffect(() => {
    if (studentsNotInClassroom.length === 0) {
      setDisableAddStudent(true);
    } else {
      setDisableAddStudent(false);
    }
  }, [studentsNotInClassroom]);

  const updateStudentList = async () => {
    const { data: studentsInClassroom } = await axios.get(
      `/api/classroom/students/${classroom[0].ClassroomID}`
    );
    setStudents(studentsInClassroom);

    const { data: allStudents } = await axios.get("/api/user/students");

    const inClassroomIDs = studentsInClassroom.map((s) => s.UserID);

    const studentsNotInClassroom = allStudents.filter(
      (s) => !inClassroomIDs.includes(s.UserID)
    );
    setStudentsNotInClassroom(studentsNotInClassroom);

    setStudentID(
      studentsNotInClassroom[0] ? studentsNotInClassroom[0].UserID : 0
    );
  };

  const saveClassroomInfo = async () => {
    const { data } = await axios.put("/api/classroom/update", {
      classroom: {
        classroomID: classroom[0].ClassroomID,
        teacherID,
        subjectID,
        roomNumber,
      },
    });
    setSingleClassroom(data);
    updateClassroomList();
    setOpenAlert(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const removeStudent = async (studentID) => {
    console.log(studentID);
    const { data } = await axios.post("/api/classroom/removestudent", {
      studentID,
      classroomID: classroom[0].ClassroomID,
    });
    if (data === "OK") {
      setOpenAlert(true);
      manageSingleClassroom(classroom[0].ClassroomID);
      await updateStudentList();
    }
  };

  const addStudent = async () => {
    const { data } = await axios.post("/api/classroom/addstudent", {
      classroomID: classroom[0].ClassroomID,
      studentID,
    });
    if (data === "OK") {
      setOpenAlert(true);
      manageSingleClassroom(classroom[0].ClassroomID);
      await updateStudentList();
    }
  };

  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          <div className={classes.backBtn}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<ArrowBack />}
              onClick={() => setSingleClassroom({})}
            >
              Back
            </Button>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Paper variant="outlined" className={classes.paper}>
            <div className={classes.field}>
              <SubjectDropdown
                subjectID={subjectID}
                setSubjectID={setSubjectID}
              />
            </div>
            <div className={classes.field}>
              <TextField
                label="Room Number"
                variant="outlined"
                value={roomNumber}
                onChange={(evt) => setRoomNumber(evt.target.value)}
              />
            </div>
            <div className={classes.field}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Teacher
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={teacherID}
                  onChange={(evt) => setTeacherID(evt.target.value)}
                  label="Teacher"
                >
                  {teachers.map((teacher) => (
                    <MenuItem key={teacher.UserID} value={teacher.UserID}>
                      {teacher.FirstName} {teacher.LastName}
                    </MenuItem>
                  ))}
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
                onClick={saveClassroomInfo}
              >
                Save
              </Button>
            </div>
            <Snackbar
              open={openAlert}
              autoHideDuration={3000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="success">
                Sucessfully Saved!
              </Alert>
            </Snackbar>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper variant="outlined" className={classes.paper}>
            <div className={classes.field}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Grade Level
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={gradeLevel}
                  onChange={(evt) => setGradeLevel(evt.target.value)}
                  label="Student"
                >
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={11}>11</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className={classes.field}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Student
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={studentID}
                  onChange={(evt) => setStudentID(evt.target.value)}
                  label="Student"
                >
                  {studentsNotInClassroom.map((student, idx) => {
                    if (
                      student.UserID === null ||
                      student.GradeLevel !== gradeLevel
                    )
                      return;
                    return (
                      <MenuItem key={idx} value={student.UserID}>
                        {student.FirstName} {student.LastName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className={classes.saveBtn}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.saveBtn}
                startIcon={<PersonAdd />}
                onClick={addStudent}
                disabled={disableAddStudent}
              >
                Add Student
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" className={classes.paper}>
            <List>
              {students.map((student, idx) => {
                return (
                  <ListItem
                    key={idx}
                    className={idx % 2 === 1 ? classes.odd : classes.even}
                  >
                    <ListItemText
                      primary={`${student.LastName}, ${student.FirstName}`}
                      secondary={`Grade: ${student.GradeLevel}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => removeStudent(student.UserID)}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ManageSingleClassroom;
