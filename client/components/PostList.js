import React, { useState, useEffect } from "react";
import { Container, makeStyles, Button, Box, Card, CardContent, CardActions, Typography } from "@material-ui/core";
import SelectClassroom from "./teacher/SelectClassroom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    list: {
        padding: theme.spacing(2)
    },
    controls: {
        display: "flex",
        padding: theme.spacing(2),
        justifyContent: "space-between"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    posts: {
        display: "flex",
        padding: theme.spacing(2),
        flexDirection: "column"
    },
    postCard: {
        display: "flex",
        textAlign: "left",
        flexGrow: 1,
        padding: theme.spacing(1)
    },
    fill: {
        flexGrow: 1
    },
    postControls: {
        justifyContent: "flex-end"
    }
}));

const PostList = (props) => {
    const { setPage, classrooms, user } = props;

    const [classroomID, setClassroomID] = useState(classrooms[0][0] ? classrooms[0][0].ClassroomID : classrooms[0].ClassroomID);
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        const { data } = await axios.get(`/api/post/${classroomID}`);
        setPosts(data);
    }, [classroomID]);

    const removePost = async (id) => {
        const { data } = await axios.delete(`/api/post/${id}`);
        if (data === 'OK') {
            setPosts(prevState => prevState.filter(post => post.ID !== id));
        }
    }

    const classes = useStyles();
    return (
        <Container>
            <Box className={classes.controls}>
                <SelectClassroom
                    classrooms={classrooms}
                    classroomID={classroomID}
                    setClassroomID={setClassroomID} />
                {user.RoleID === 2 && (<Button
                    variant="contained"
                    color="primary"
                    onClick={() => { setPage("create-post") }}
                >Create Post</Button>)}
            </Box>
            <Box className={classes.posts}>
                {posts.map(post => (
                    <Box key={post.ID} className={classes.postCard}>
                        <Card className={classes.fill}>
                            <CardContent>
                                {post.Content.split('\n').map((item, key) => {
                                    return <span key={key}>{item.replace(/['"]+/g, '')}<br /></span>
                                })}
                            </CardContent>
                            <CardActions className={classes.postControls}>
                                {user.RoleID === 2 && (<Button
                                    size="small"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => removePost(post.ID)}>Remove Post</Button>
                                )}
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    onClick={() => { }}>Comments</Button>
                            </CardActions>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Container>
    );
}

export default PostList;