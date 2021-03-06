const router = require("express").Router();
const {
  getUserByID,
  checkUserAndPassword,
  registerUser,
  getUserByEmail,
  getAllUsers,
  activateUser,
  deactivateUser,
  updateUser,
  getUsersByRoleID,
} = require("../database/user");

router.get("/auth", (req, res, next) => {
  res.json(req.user || {});
});

router.put("/login", async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    checkUserAndPassword(username, password, (result) => {
      const user = result[0];
      if (!user) {
        return res.status(401).send();
      }
      req.login(user, (err) => (err ? next(err) : res.json(user)));
    });
  } catch (error) {
    console.log(error);
  }
});

router.put("/register", async (req, res, next) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const password = req.body.password;
    const userType = req.body.userType;

    getUserByEmail(username, (result) => {
      if (result) {
        res.status(400).send("That email already exists.");
        return;
      } else {
        registerUser(
          firstName,
          lastName,
          username,
          password,
          userType,
          (result) => {
            console.log(result);
            res.sendStatus(200);
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/activate", async (req, res, next) => {
  try {
    const userID = req.body.userID;

    activateUser(userID, (result) => {
      console.log(result);
      getUserByID(userID, (result) => res.json(result));
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/deactivate", async (req, res, next) => {
  try {
    const userID = req.body.userID;

    deactivateUser(userID, (result) => {
      console.log(result);
      getUserByID(userID, (result) => res.json(result));
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/logout", (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) return next(err);
    res.status(204).end();
  });
});

router.get("/all", async (req, res, next) => {
  try {
    if (req.user.RoleID === 1) {
      getAllUsers((results) => res.json(results));
    }
  } catch (error) {
    next(error);
  }
});

router.put("/update", async (req, res, next) => {
  try {
    const user = req.body.user;
    updateUser(user, (result) => {
      getUserByID(user.userID, (result) => res.json(result));
    });
  } catch (error) {
    next(error);
  }
});

router.get("/teachers", async (req, res, next) => {
  try {
    if (req.user.RoleID === 1) {
      getUsersByRoleID(2, (results) => res.json(results));
    }
  } catch (error) {
    next(error);
  }
});

router.get("/students", async (req, res, next) => {
  try {
    if (req.user.RoleID === 1) {
      getUsersByRoleID(3, (results) => res.json(results));
    }
  } catch (error) {
    next(error);
  }
});

router.get("/parents", async (req, res, next) => {
  try {
    if (req.user.RoleID === 1) {
      getUsersByRoleID(4, (results) => res.json(results));
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:userID", async (req, res, next) => {
  try {
    const userID = req.params.userID; //getting the userID from the URL bar
    getUserByID(userID, (result) => res.json(result));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
