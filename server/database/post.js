const { connection } = require("./db");

function createPost(post, callback) {
    connection.query(
        {
            sql: `
        INSERT INTO tblPost (
          Content,
          AuthorID,
          ClassroomID
        ) VALUES (
          '${post.content}',
          '${post.authorID}',
          '${post.classroomID}'
          )`
        },
        (error, results) => {
            if (error) {
                console.error("Error creating a post: ", error);
                return false;
            }
            return callback(results);
        }
    );
}


function getPostsByClassroomID(classroomID, callback) {
    connection.query(
        {
            sql: `
        SELECT
          ID,
          Content,
          AuthorID,
          ClassroomID,
          CreatedDate,
          FirstName,
          LastName
        FROM tblPost
        INNER JOIN tblUsers ON UserID = AuthorID
        WHERE ClassroomID = ${classroomID}`
        },
        (error, results) => {
            if (error) {
                console.error("Error retreiving posts from classroom: ", error);
                return false;
            }
            return callback(results);
        }
    );
}

function deletePostByID(postID, callback) {
    connection.query(
        {
            sql: `
            DELETE FROM tblPost
            WHERE ID='${postID}'
            `
        },
        (error, results) => {
            if (error) {
                console.error("Error retreiving posts from classroom: ", error);
                return false;
            }
            return callback(results);
        }
    );
}

module.exports = {
    createPost,
    getPostsByClassroomID,
    deletePostByID
}