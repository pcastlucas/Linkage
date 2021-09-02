import React, { useState, useEffect, useContext } from "react";
import userContext from "../../context/userContext";
import { Redirect } from "react-router";
import { objIsEmpty } from "../../utilities";
import { Container, Box, Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import StudentClassroomList from "./StudentClassroomList";
import axios from "axios";
import StudentDrawer from "./StudentDrawer";
import PostList from "../PostList";

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

const StudentHome = () => {
    const [user] = useContext(userContext);
    const [classrooms, setClassrooms] = useState([]);
    const [barTxtLine1, setBarTxtLine1] = useState(`Hello, ${user.FirstName} ${user.LastName}`);
    const [barTxtLine2, setBarTxtLine2] = useState("");
    const [page, setPage] = useState("home");


    useEffect(async () => {
        const { data } = await axios.get(
            `/api/classroom/by-student/${user.UserID}`
        );

        setClassrooms(data);
    }, []);

    useEffect(() => {
        if (page === "home") {
            setBarTxtLine1(`Hello, ${user.FirstName} ${user.LastName}`);
            setBarTxtLine2("");
        } else if (page === "posts") {
            setBarTxtLine1("Posts");
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
            <StudentDrawer setPage={setPage} />

            <Container className={classes.homeContainer}>
                <Box className={classes.test}>
                    <Card variant="outlined" className={classes.welcomeCard}>
                        <CardContent>
                            <Typography>{barTxtLine1}</Typography>
                            <Typography>{barTxtLine2}</Typography>
                        </CardContent>
                    </Card>
                </Box>
                {page === "home" && <StudentClassroomList
                    classrooms={classrooms} />}
                {page === "posts" && <PostList
                    classrooms={classrooms}
                    setPage={setPage}
                    user={user} />}
            </Container>
        </Box>
    );
}
export default StudentHome;