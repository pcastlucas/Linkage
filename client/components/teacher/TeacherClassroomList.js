import React from "react";
import { Box, Card, CardContent, CardActions, makeStyles, Container, Typography, Button } from "@material-ui/core";
import { getSubjectName } from "../../utilities";

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

const TeacherClassroomList = (props) => {
    const { classrooms, selectClassroom, setPage } = props;

    const classes = useStyles();

    const gotoStudentPage = (classroom) => {
        selectClassroom(classroom);
        setPage("students");
    }

    return (
        <Container className={classes.cardsContainer}>
            {classrooms.map((classroom) => (
                <Box key={classroom[0].ClassroomID} p={2} textAlign="center">
                    <Card variant="outlined" className={classes.card}>
                        <CardContent>
                            <Typography>{getSubjectName(classroom[0].SubjectID)}</Typography>
                            <Typography>Room Number: {classroom[0].RoomNumber}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => gotoStudentPage(classroom[0])}>Students</Button>
                        </CardActions>
                    </Card>
                </Box>
            ))}
        </Container>
    )
}

export default TeacherClassroomList;