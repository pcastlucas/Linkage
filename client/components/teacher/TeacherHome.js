import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";
import TeacherDrawer from "./TeacherDrawer";
import { objIsEmpty, groupBy, getSubjectName } from "../../utilities";
import userContext from "../../context/userContext";
import { Box, Card, CardContent, makeStyles, Container, Typography } from "@material-ui/core";
import axios from "axios";
import TeacherClassroomList from "./TeacherClassroomList";
import StudentList from "./StudentList";
import PostList from "../PostList";
import CreatePost from "./CreatePost";

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

  useEffect(() => {
    if (page === "home") {
      setBarTxtLine1(`Hello, ${user.FirstName} ${user.LastName}`);
      setBarTxtLine2("");
    } else if (page === "students") {
      setBarTxtLine1(getSubjectName(selectedClassroom.SubjectID));
      setBarTxtLine2(`Room Number: ${selectedClassroom.RoomNumber}`)
    } else if (page === "posts") {
      setBarTxtLine1("Posts");
      setBarTxtLine2(``)
    } else if (page === "create-post") {
      setBarTxtLine1("Create a Post");
      setBarTxtLine2(``)
    }
  }, [page])

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
          setPage={setPage} />}
        {page === "students" && <StudentList
          classroom={selectedClassroom}
          setPage={setPage} />}
        {page === "posts" && <PostList
          classrooms={classrooms}
          setPage={setPage}
          user={user} />}
        {page === "create-post" && <CreatePost
          classrooms={classrooms} teacherID={user.UserID} />}
      </Container>
    </Box>
  );
};

export default TeacherHome;
