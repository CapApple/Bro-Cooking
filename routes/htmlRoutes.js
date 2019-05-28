var db = require("../models");
var Sequelize = require("sequelize");
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");
module.exports = function(app) {
  // Load index page
  // load recipes with more than 5 favorites
  app.get("/favorites", function(req, res) {
    db.Recipe.findAll({
      where: {favorites: {[Sequelize.Op.gte]: 5}},
      order: [['favorites', 'DESC']]
    }).then(function(dbResults) {
      res.render("favorites", {
        // msg: "These recipes are hot!",
        examples: dbResults
      });
    });
  });


  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/index.html");
    }
    res.sendFile(path.join(__dirname, "/index.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/index.html");
    }
    res.sendFile(path.join(__dirname, "/index.html"));
  });

   // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

};

