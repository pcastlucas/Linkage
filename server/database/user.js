const { connection } = require("./db");

function getUserByID(userID, callback) {
  connection.query(
    {
      sql: "SELECT UserID, Username, Password, EmailAddress, FirstName, LastName, RoleID FROM tblUsers WHERE `userID`=?",
      values: [userID],
    },
    (error, results) => {
      if (error) {
        console.error("Error retrieving user by ID: ", error);
        return false;
      }
      return callback(results[0]);
    }
  );
}

function checkUserAndPassword(username, password, callback) {
  connection.query(
    {
      sql: "SELECT UserID, Username, EmailAddress, FirstName, LastName, RoleID FROM tblUsers WHERE `Username`=? AND `Password`=?",
      values: [username, password],
    },
    (error, results) => {
      if (error) {
        console.error("Error checking username and password: ", error);
      }
      return callback(results);
    }
  );
}

function registerUser(firstName, lastName, username, password, userType, callback) {
  connection.query(
    {
      sql: `INSERT INTO tblUsers (Username, Password, EmailAddress, FirstName, LastName, RoleID) VALUES ('${username}', '${password}', '${username}', '${firstName}', '${lastName}', ${userType})`,
    },
    (error, results) => {
      if (error) {
        console.log("Error registering new user", error);
      }
      return callback(results);
    }
  )
}

module.exports = { getUserByID, checkUserAndPassword, registerUser };
