// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
      chosenChallenge: req.user.chosenChallenge
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });
  // Post method verified by postman

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  // Logout verified by postman

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({ result: "no result" });
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      // res.send({
      //   email: req.user.email,
      //   id: req.user.id,
      //   challenge: req.user.challenge
      // });
      db.User.findAll({
        attributes: ["email", "id", "challenge"],
        where: {
          email: req.user.email
        }
      }).then(dbUser => {
        res.send(dbUser);
      });
    }
  });

  app.patch("/api/user_data/:id/challenge", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({ result: "no result" });
      return;
    }
    db.User.update(
      {
        challenge: req.body.challenge
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(() => {
      res.json({ result: "successful patch" });
    });
  });

  app.get("/api/user_data/:id", function(req, res) {
    const testData = [
      {
        day: "1",
        challengeName: "Pushups",
        reps: "25",
        isComplete: "0"
      },
      {
        day: "2",
        challengeName: "Pushups",
        reps: "26",
        isComplete: "0"
      },
      {
        day: "3",
        challengeName: "Pushups",
        reps: "27",
        isComplete: "0"
      },
      {
        day: "4",
        challengeName: "Pushups",
        reps: "28",
        isComplete: "0"
      },
      {
        day: "5",
        challengeName: "Pushups",
        reps: "29",
        isComplete: "0"
      },
      {
        day: "6",
        challengeName: "Pushups",
        reps: "30",
        isComplete: "0"
      },
      {
        day: "7",
        challengeName: "Pushups",
        reps: "31",
        isComplete: "0"
      },
      {
        day: "8",
        challengeName: "Pushups",
        reps: "32",
        isComplete: "0"
      },
      {
        day: "9",
        challengeName: "Pushups",
        reps: "33",
        isComplete: "0"
      },
      {
        day: "10",
        challengeName: "Pushups",
        reps: "34",
        isComplete: "0"
      },
      {
        day: "11",
        challengeName: "Pushups",
        reps: "35",
        isComplete: "0"
      },
      {
        day: "12",
        challengeName: "Pushups",
        reps: "36",
        isComplete: "0"
      },
      {
        day: "13",
        challengeName: "Pushups",
        reps: "37",
        isComplete: "0"
      },
      {
        day: "14",
        challengeName: "Pushups",
        reps: "38",
        isComplete: "0"
      },
      {
        day: "15",
        challengeName: "Pushups",
        reps: "39",
        isComplete: "0"
      },
      {
        day: "16",
        challengeName: "Pushups",
        reps: "40",
        isComplete: "0"
      },
      {
        day: "17",
        challengeName: "Pushups",
        reps: "41",
        isComplete: "0"
      },
      {
        day: "18",
        challengeName: "Pushups",
        reps: "42",
        isComplete: "0"
      },
      {
        day: "19",
        challengeName: "Pushups",
        reps: "43",
        isComplete: "0"
      },
      {
        day: "20",
        challengeName: "Pushups",
        reps: "44",
        isComplete: "0"
      },
      {
        day: "21",
        challengeName: "Pushups",
        reps: "45",
        isComplete: "0"
      },
      {
        day: "22",
        challengeName: "Pushups",
        reps: "46",
        isComplete: "0"
      },
      {
        day: "23",
        challengeName: "Pushups",
        reps: "47",
        isComplete: "0"
      },
      {
        day: "24",
        challengeName: "Pushups",
        reps: "48",
        isComplete: "0"
      },
      {
        day: "25",
        challengeName: "Pushups",
        reps: "49",
        isComplete: "0"
      },
      {
        day: "26",
        challengeName: "Pushups",
        reps: "50",
        isComplete: "0"
      },
      {
        day: "27",
        challengeName: "Pushups",
        reps: "51",
        isComplete: "0"
      },
      {
        day: "28",
        challengeName: "Pushups",
        reps: "52",
        isComplete: "0"
      },
      {
        day: "29",
        challengeName: "Pushups",
        reps: "53",
        isComplete: "0"
      },
      {
        day: "30",
        challengeName: "Pushups",
        reps: "54",
        isComplete: "0"
      }
    ];
    res.json({
      id: "1",
      email: "a@a.com",
      challenge: testData
    });
    //   if (!req.user) {
    //     // The user is not logged in, send back an empty object
    //     res.send({ result: "no result" });
    //   } else {
    //     // Otherwise send back the user's email and id
    //     // Sending back a password, even a hashed password, isn't a good idea
    //     // res.send({ challenge: req.user.challenge });
    //     db.User.findAll(
    //       {
    //         attributes: ["challenge"]
    //       },
    //       {
    //         where: {
    //           id: req.params.id
    //         }
    //       }
    //     ).then(challenge => {
    //       res.send(challenge);
    //     });
    //   }
  });
};
