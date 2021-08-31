import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";
import TeacherDrawer from "./TeacherDrawer";
import { objIsEmpty, groupBy, getSubjectName } from "../../utilities";
import userContext from "../../context/userContext";
import { Box, Card, CardContent, CardActions, makeStyles, Container, Typography, Button } from "@material-ui/core";
import axios from "axios";
import TeacherClassroomList from "./TeacherClassroomList";
import StudentList from "./StudentList";

const useStyles = makeStyles((theme) => ({
  card: {
  },
  homeContainer: {
    padding: theme.spacing(3),
    textAlign: "center"
  },
  test: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center"
  },
  cardsContainer: {
    display: "flex",
    padding: theme.spacing(3),
    justifyContent: "center"
  },
  welcomeCard: {
    padding: theme.spacing(3),
    flexGrow: 1,
    alignItems: "stretch",
  }
}));

const TeacherHome = () => {
  const [user] = useContext(userContext);
  const [page, setPage] = useState("home");
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, selectClassroom] = useState({});
  const [barTxtLine1, setBarTxtLine1] = useState(`Hello, ${user.FirstName} ${user.LastName}`);
  const [barTxtLine2, setBarTxtLine2] = useState("");


  useEffect(async () => {
    const { data } = await axios.get(
      `/api/classroom/by-teacher/${user.UserID}`
    );

    setClassrooms(groupBy(data, "ClassroomID"));
  }, []);

  const classes = useStyles();
  return (
    <Box display="flex">
      {!objIsEmpty(user) && <Redirect to="/home" />}
      <TeacherDrawer setPage={setPage} />
      <Container className={classes.homeContainer}>
        <Box className={classes.test}>
          <Card variant="outlined" className={classes.welcomeCard}>
            <CardContent>
              <Typography>{barTxtLine1}</Typography>
              <Typography>{barTxtLine2}</Typography>
            </CardContent>
          </Card>
        </Box>
        {page === "home" && <TeacherClassroomList
          classrooms={classrooms}
          selectClassroom={selectClassroom}
          setPage={setPage}
          setBarTxtLine1={setBarTxtLine1}
          setBarTxtLine2={setBarTxtLine2} />}
        {page === "students" && <StudentList
          classroom={selectedClassroom}
          setBarTxtLine1={setBarTxtLine1}
          setBarTxtLine2={setBarTxtLine2}
          setPage={setPage} />}
      </Container>
    </Box>
  );
};

export default TeacherHome;
