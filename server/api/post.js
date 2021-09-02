const router = require("express").Router();
const { json } = require("express");
const { createPost, getPostsByClassroomID, deletePostByID } = require("../database/post");

router.post("/create", (req, res, next) => {
    try {
        const post = req.body.post;
        createPost(post, (result => res.json(result)));
    } catch (error) {
        console.log(error)
    }
});

router.get("/:classroomID", (req, res, next) => {
    try {
        const classroomID = req.params.classroomID;
        getPostsByClassroomID(classroomID, results => res.json(results));

    } catch (error) {
        console.log(error);
    }
});

router.delete("/:postID", (req, res, next) => {
    try {
        const postID = req.params.postID;
        deletePostByID(postID, result => result.affectedRows >= 1 ? res.sendStatus(200) : res.sendStatus(500));
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
