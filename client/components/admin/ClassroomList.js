import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListSubheader,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  makeStyles,
  Modal,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Snackbar,
} from "@material-ui/core";
import { getSubjectName } from "../../utilities";
import { Edit, Add, Delete } from "@material-ui/icons";
import SubjectDropdown from "./SubjectDropdown";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  topBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  saveBtn: {
    display: "flex",
    justifyContent: "flex-end",
  },
  field: {
    padding: theme.spacing(1),
  },
}));

const ClassroomList = (props) => {
  const { classrooms, manageSingleClassroom, updateClassroomList } = props;
  const [subjectID, setSubjectID] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [newSubjectID, setNewSubjectID] = useState(1);
  const [teachers, setTeachers] = useState([]);
  const [teacherID, setTeacherID] = useState();
  const [roomNumber, setRoomNumber] = useState(101);
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(async () => {
    const { data: teacherData } = await axios.get("/api/user/teachers");
    setTeachers(teacherData);
    setTeacherID(teacherData[0].UserID);
  }, []);

  const getFilteredClassrooms = classrooms.filter(
    (classroom) => classroom.SubjectID === subjectID
  );

  const addClassroom = async () => {
    const { data } = await axios.post("/api/classroom/add", {
      classroom: {
        teacherID,
        subjectID: newSubjectID,
        roomNumber,
      },
    });

    await updateClassroomList();
    setOpenAlert(true);
  };

  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const removeClassroom = async (classroomID) => {
    const { data } = await axios.delete(`/api/classroom/${classroomID}`);
    if (data === "OK") {
      setOpenAlert(true);
      await updateClassroomList();
    }
  };

  return (
    <div>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Sucessfully Saved!
        </Alert>
      </Snackbar>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Add a Classroom</h2>
          <div className={classes.field}>
            <SubjectDropdown
              subjectID={newSubjectID}
              setSubjectID={setNewSubjectID}
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
              startIcon={<Add />}
              onClick={addClassroom}
            >
              Add Classroom
            </Button>
          </div>
        </div>
      </Modal>
      <div className={classes.topBar}>
        <SubjectDropdown subjectID={subjectID} setSubjectID={setSubjectID} />

        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<Add />}
          onClick={() => setOpenModal(true)}
        >
          Add Classroom
        </Button>
      </div>
      <List>
        <ListSubheader>{getSubjectName(subjectID)}</ListSubheader>
        {getFilteredClassrooms.map((classroom) => {
          return (
            <ListItem key={classroom.ClassroomID}>
              <ListItemText
                primary={`${classroom.TeacherLastName}, ${classroom.TeacherFirstName}`}
                secondary={`Room Number: ${classroom.RoomNumber}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => manageSingleClassroom(classroom.ClassroomID)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => removeClassroom(classroom.ClassroomID)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default ClassroomList;
