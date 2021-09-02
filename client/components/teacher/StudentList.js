import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Container, makeStyles, Button, Box, Typography } from "@material-ui/core";
import axios from "axios";
import { getSubjectName } from "../../utilities";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    list: {
        padding: theme.spacing(2)
    },
    controls: {
        display: "flex",
        padding: theme.spacing(2),
        justifyContent: "space-between"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const StudentList = (props) => {
    const { classroom, setBarTxtLine1, setBarTxtLine2, setPage } = props;

    const [students, setStudents] = useState([]);
    const [selectedStudents, selectStudents] = useState([]);
    const [emailModal, setEmailModal] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [filteredAssignments, setFilteredAssignments] = useState([]);

    useEffect(() => {
        refreshStudents();
        refreshAssignments();
    }, [classroom]);

    const refreshStudents = async () => {
        const { data } = await axios.get(
            `/api/classroom/students/${classroom.ClassroomID}`
        );
        setStudents(data);
    }

    const refreshAssignments = async () => {
        const { data: assignmentsData } = await axios.get(`/api/classroom/${classroom.ClassroomID}/assignments`);
        setAssignments(assignmentsData);
    }

    const filterAssignments = () => {
        setFilteredAssignments(assignments.filter(a => selectedStudents.includes(a.StudentID)));
    }

    const getStudentAverage = (studentID) => {
        const studentAssignments = assignments.filter(a => a.StudentID === studentID);

        const studentGrades = studentAssignments.map(a => a.Grade);

        return studentGrades.reduce((sum, val) => sum + val, 0) / studentGrades.length;
    }

    const getLetterGrade = (studentID) => {
        const avg = getStudentAverage(studentID);

        if (avg >= 90) {
            return "A";
        } else if (avg >= 80 && avg <= 89) {
            return "B";
        } else if (avg >= 70 && avg <= 79) {
            return "C";
        } else {
            return "F";
        }
    }

    const studentColumns = [
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'average', headerName: 'Average', width: 150, },
        { field: 'letterGrade', headerName: 'Letter Grade', width: 150, }
    ];

    const studentRows = students.map(student => ({ id: student.UserID, firstName: student.FirstName, lastName: student.LastName, email: student.Username, average: getStudentAverage(student.UserID), letterGrade: getLetterGrade(student.UserID) }));

    const assignmentColumns = [
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'grade', headerName: 'Grade', width: 150, editable: true }
    ];

    const assignmentRows = filteredAssignments.map(assignment => ({ id: assignment.AssignmentID, firstName: assignment.StudentFirstName, lastName: assignment.StudentLastName, grade: assignment.Grade }));

    const editGrade = async (edited) => {
        const { data } = await axios.put("/api/classroom/assignment", {
            assignmentID: edited.id,
            grade: edited.value
        });

        setAssignments(assignments => assignments.map(a => {
            if (a.AssignmentID === edited.id) {
                a.Grade = edited.value;
                return a;
            }
            return a;
        }));
        console.log(assignments);
    }

    const classes = useStyles();

    return (
        <Container className={classes.list}>
            <Box className={classes.controls}>
                <Button variant="contained" color="primary" onClick={() => setEmailModal(true)}>Send Email to selected students</Button>
            </Box>
            <DataGrid
                columns={studentColumns}
                rows={studentRows}
                checkboxSelection
                onSelectionModelChange={(selected) => selectStudents(selected)}
            />
            <Box className={classes.controls}>
                <Button variant="contained" color="primary" onClick={filterAssignments}>View Assignments of selected students</Button>
                <Button variant="contained" color="primary" onClick={() => { }}>Assign Work</Button>
            </Box>
            <Box>
                <Typography>Assignments</Typography>
                <DataGrid
                    columns={assignmentColumns}
                    rows={assignmentRows}
                    checkboxSelection
                    onCellEditCommit={(edited) => editGrade(edited)} />
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={emailModal}
                onClose={() => setEmailModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={emailModal}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Email</h2>
                    </div>
                </Fade>
            </Modal>
        </Container >)
}

export default StudentList;