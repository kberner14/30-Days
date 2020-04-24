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
      db.User.findAll(
        {
          attributes: ["email", "id", "challenge"]
        },
        {
          where: {
            email: req.user.email
          }
        }
      ).then(dbUser => {
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
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.send({ result: "no result" });
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      // res.send({ challenge: req.user.challenge });
      db.User.findAll(
        {
          attributes: ["challenge"]
        },
        {
          where: {
            id: req.params.id
          }
        }
      ).then(challenge => {
        res.send(challenge);
      });
    }
  });
};
