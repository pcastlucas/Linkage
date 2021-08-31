const router = require("express").Router();
const {
  getClassroomByID,
  getAllClassrooms,
  removeStudentFromClassroom,
  updateClassroom,
  addStudentToClassroom,
  getStudentsByClassroomID,
  addClassroom,
  deleteClassroom,
  getClassroomByTeacherID,
  getAssignmentsByClassroomID,
  getAssignmentsByStudentID,
  updateAssignmentGradeByID
} = require("../database/classroom");

router.get("/all", async (req, res, next) => {
  try {
    if (req.user.UserID === 1) {
      getAllClassrooms((results) => res.json(results));
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/removestudent", async (req, res, next) => {
  try {
    const studentID = req.body.studentID;
    const classroomID = req.body.classroomID;

    removeStudentFromClassroom(studentID, classroomID, (result) => {
      if (result.affectedRows > 0) {
        res.sendStatus(200);
      } else {
        console.log(result);
        res.sendStatus(500);
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post("/addstudent", async (req, res, next) => {
  try {
    const studentID = req.body.studentID;
    const classroomID = req.body.classroomID;

    addStudentToClassroom(studentID, classroomID, (result) => {
      if (result.affectedRows > 0) {
        res.sendStatus(200);
      } else {
        console.log(result);
        res.sendStatus(500);
      }
    });
  } catch (error) {
    next(error);
  }
});

router.put("/update", async (req, res, next) => {
  try {
    const classroom = req.body.classroom;
    updateClassroom(classroom, (result) =>
      getClassroomByID(classroom.classroomID, (result) => res.json(result))
    );
  } catch (error) {
    next(error);
  }
});

router.post("/add", (req, res, next) => {
  try {
    const classroom = req.body.classroom;
    addClassroom(classroom, (result) => res.json(result));
  } catch (error) { }
});

router.delete("/:classroomID", (req, res, next) => {
  const classroomID = req.params.classroomID;
  deleteClassroom(classroomID, (result) => {
    res.sendStatus(200);
  });
});

router.get("/by-teacher/:teacherID", (req, res, next) => {
  try {
    const teacherID = req.params.teacherID;
    getClassroomByTeacherID(teacherID, (results) => res.json(results));
  } catch (error) {
    next(error);
  }
});

router.get("/students/:classroomID", (req, res, next) => {
  try {
    const classroomID = req.params.classroomID;
    getStudentsByClassroomID(classroomID, (results) => res.json(results));
  } catch (error) {
    next(error);
  }
});

router.get("/:classroomID", async (req, res, next) => {
  try {
    const classroomID = req.params.classroomID;
    getClassroomByID(classroomID, (result) => res.json(result));
  } catch (error) {
    next(error);
  }
});

router.get("/:classroomID/assignments", (req, res, next) => {
  if (req.user.RoleID <= 2) {
    try {
      const classroomID = req.params.classroomID;
      getAssignmentsByClassroomID(classroomID, (result) => res.json(result));
    } catch (error) {
      next(error);
    }
  } else {
    res.sendStatus(403);
  }
});


router.put("/assignment", (req, res, next) => {
  if (req.user.RoleID <= 2) {
    try {
      const assignmentID = req.body.assignmentID;
      const grade = req.body.grade;
      updateAssignmentGradeByID(assignmentID, grade, (result) => res.json(result));
    } catch (error) {
      next(error);
    }
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;
