const express = require("express");
const path = require("path");
const db = require("./database/db");
const session = require("express-session");
const passport = require("passport");
const secret = require("../secret");
const { getUserByID } = require("./database/user");

const app = express();
const port = 3000;

// Session middleware
app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// consumes 'req.session' so that passport can know what's on the session
app.use(passport.initialize());

// this will invoke our registered 'deserializeUser' method
// and attempt to put our user on 'req.user'
app.use(passport.session());

// after we find or create a user, we 'serialize' our user on the session
passport.serializeUser((user, done) => {
  done(null, user.UserID);
});

// If we've serialized the user on our session with an id, we look it up here
// and attach it as 'req.user'.
passport.deserializeUser((id, done) => {
  try {
    getUserByID(id, (result) => {
      const user = JSON.parse(JSON.stringify(result));
      done(null, user);
    });
  } catch (err) {
    done(err);
  }
});

// Routing middleware
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", require("./api/api"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Start server on port and connect to db
app.listen(port, () => {
  try {
    db.connect();
  } catch (error) {
    console.log("Something went wrong connecting to the database: ", error);
  }
  console.log(`Linkage server listening at http://localhost:${port}`);
});
