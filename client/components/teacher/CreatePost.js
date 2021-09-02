import React, { useState } from "react";
import {
    Container,
    makeStyles,
    Box,
    TextField,
    Button,
    Snackbar
} from "@material-ui/core";
import axios from "axios";
import SelectClassroom from "./SelectClassroom";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    list: {
        padding: theme.spacing(2)
    },
    headControls: {
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
    content: {
        display: "flex"
    },
    txtContent: {
        flexGrow: 1
    },
    footerControls: {
        display: "flex",
        padding: theme.spacing(2),
        justifyContent: "flex-end"
    }
}));

const CreatePost = (props) => {
    const { classrooms, teacherID } = props;

    const [classroomID, setClassroomID] = useState(classrooms[0][0].ClassroomID);
    const [content, setContent] = useState("");
    const [openSnack, setOpenSnack] = useState(false);

    const handleSend = async () => {
        const stringifiedContent = JSON.stringify(content).replace(/"([^"]+)":/g, '$1:');

        await axios.post("/api/post/create", {
            post: {
                content: stringifiedContent,
                authorID: teacherID,
                classroomID: classroomID
            }
        });
        setOpenSnack(true);
    }

    const classes = useStyles();
    return (<Container>
        <Box className={classes.headControls}>
            <SelectClassroom
                classroomID={classroomID}
                setClassroomID={setClassroomID}
                classrooms={classrooms} />
        </Box>
        <Box className={classes.content}>
            <TextField
                id="outlined-multiline-static"
                label="Content"
                multiline
                rows={20}
                variant="outlined"
                className={classes.txtContent}
                value={content}
                onChange={(evt) => setContent(evt.target.value)}
            />
        </Box>
        <Box className={classes.footerControls}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSend}
            >Send</Button>
        </Box>
        <Snackbar
            open={openSnack}
            autoHideDuration={3000}
            onClose={() => setOpenSnack(false)}
        >
            <Alert onClose={() => setOpenSnack(false)} severity="success">
                Sucessfully Posted!
            </Alert>
        </Snackbar>
    </Container>)
}

export default CreatePost;