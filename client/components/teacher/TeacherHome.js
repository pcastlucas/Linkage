import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router";
import TeacherDrawer from "./TeacherDrawer";
import { objIsEmpty, groupBy, getSubjectName } from "../../utilities";
import userContext from "../../context/userContext";
import { Box, Card, CardContent, CardActions } from "@material-ui/core";
import axios from "axios";

const TeacherHome = () => {
  const [user] = useContext(userContext);
  const [classrooms, setClassrooms] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get(
      `/api/classroom/by-teacher/${user.UserID}`
    );

    setClassrooms(groupBy(data, "ClassroomID"));
    console.log(groupBy(data, "ClassroomID"));
  }, []);

  return (
    <Box display="flex">
      {!objIsEmpty(user) && <Redirect to="/home" />}
      <TeacherDrawer />
      {classrooms.map((classroom) => (
        <Card variant="outlined" key={classroom[0].ClassroomID}>
          <CardContent>{getSubjectName(classroom[0].SubjectID)}</CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default TeacherHome;
