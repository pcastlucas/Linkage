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

const StudentClassroomList = (props) => {
    const { classrooms } = props;

    const classes = useStyles();
    return (
        <Container className={classes.cardsContainer}>
            {classrooms.map((classroom) => (
                <Box key={classroom.ClassroomID} p={2} textAlign="center">
                    <Card variant="outlined" className={classes.card}>
                        <CardContent>
                            <Typography>{getSubjectName(classroom.SubjectID)}</Typography>
                            <Typography>Room Number: {classroom.RoomNumber}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" size="small" color="primary" onClick={() => {}}>Email Teacher</Button>
                        </CardActions>
                    </Card>
                </Box>
            ))}
        </Container>);
}

export default StudentClassroomList;