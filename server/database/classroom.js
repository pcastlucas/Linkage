const { connection } = require("./db");

function getClassroomByID(classroomID, callback) {
  connection.query(
    {
      sql: `
      SELECT 
        c.ClassroomID, 
        c.TeacherID, 
        c.SubjectID,
        c.RoomNumber,
        teacher.FirstName as TeacherFirstName,
        teacher.LastName as TeacherLastName,
        student.UserID as StudentID,
        student.FirstName as StudentFirstName,
        student.LastName as StudentLastName
      FROM tblClassroom c
      INNER JOIN tblUsers teacher ON c.TeacherID = teacher.UserID
      LEFT JOIN tblClassroomStudents cs ON c.ClassroomID = cs.ClassroomID
      LEFT JOIN tblUsers student ON cs.StudentID = student.UserID
      WHERE c.ClassroomID=${classroomID}`,
    },
    (error, results) => {
      if (error) {
        console.error("Error retrieving classroom by ID: ", error);
        return false;
      }
      return callback(results);
    }
  );
}

function getAllClassrooms(callback) {
  connection.query(
    {
      sql: `
      SELECT 
        ClassroomID, 
        TeacherID, 
        SubjectID,
        RoomNumber,
        u.FirstName as TeacherFirstName,
        u.LastName as TeacherLastName
        FROM tblClassroom c
        INNER JOIN tblUsers u ON c.TeacherID = u.UserID`,
    },
    (error, results) => {
      if (error) {
        console.error("Error retrieving all classrooms: ", error);
        return false;
      }
      return callback(results);
    }
  );
}

function removeStudentFromClassroom(studentID, classroomID, callback) {
  connection.query(
    {
      sql: `
      DELETE FROM tblClassroomStudents
      WHERE ClassroomID='${classroomID}' AND StudentID='${studentID}'`,
    },
    (error, results) => {
      if (error) {
        console.error("Error removing student from classroom: ", error);
        return false;
      }
      return callback(results);
    }
  );
}

function addStudentToClassroom(studentID, classroomID, callback) {
  connection.query(
    {
      sql: `
      INSERT INTO tblClassroomStudents (ClassroomID, StudentID)
      VALUES ('${classroomID}', '${studentID}')`,
    },
    (error, results) => {
      if (error) {
        console.error("Error removing student from classroom: ", error);
        return false;
      }
      return callback(results);
    }
  );
}

function updateClassroom(classroom, callback) {
  connection.query(
    {
      sql: `
      UPDATE tblClassroom
        SET TeacherID='${classroom.teacherID}',
            SubjectID='${classroom.subjectID}',
            RoomNumber='${classroom.roomNumber}'
      WHERE ClassroomID='${classroom.classroomID}'`,
    },
    (error, results) => {
      if (error) {
        console.error("Error removing student from classroom: ", error);
        return false;
      }
      return callback(results);
    }
  );
}

function getStudentsByClassroomID(classroomID, callback) {
  connection.query(
    {
      sql: `
      SELECT 
        ClassroomID,
        UserID,
        Username, 
        Password, 
        EmailAddress, 
        FirstName, 
        LastName, 
        RoleID, 
        Active,
        GradeLevel
        FROM tblUsers
        INNER JOIN tblClassroomStudents s ON s.StudentID=UserID
        INNER JOIN tblStudentGradeLevel g ON g.StudentID=UserID
        WHERE ClassroomID='${classroomID}' AND RoleID=3`,
    },
    (error, results) => {
      if (error) {
        console.error("Error retrieving students from classroom: ", error);
        return false;
      }
      return callback(results);
    }
  );
}

function addClassroom(classroom, callback) {
  connection.query(
    {
      sql: `
      INSERT INTO tblClassroom (TeacherID, SubjectID, RoomNumber)
      VALUES ('${classroom.teacherID}', '${classroom.subjectID}', ${classroom.roomNumber})`,
    },
    (error, results) => {
      if (error) {
        console.error("Error adding a new classroom: ", error);
        return false;
      }
      return callback(results);
    }
  );
}

function deleteClassroom(classroomID, callback) {
  connection.query(
    {
      sql: `
      DELETE FROM tblClassroomStudents WHERE ClassroomID='${classroomID}';

      DELETE FROM tblClassroom WHERE ClassroomID='${classroomID}';`,
    },
    (error, results) => {
      if (error) {
        console.error("Error deleting classroom: ", error);
        return false;
      }
      return callback(results);
    }
  );
}

module.exports = {
  getClassroomByID,
  getAllClassrooms,
  removeStudentFromClassroom,
  updateClassroom,
  addStudentToClassroom,
  getStudentsByClassroomID,
  addClassroom,
  deleteClassroom
};
