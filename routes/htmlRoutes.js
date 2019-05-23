var db = require("../models");
var Sequelize = require("sequelize");
module.exports = function(app) {
  // Load index page
  // find recipes with more than 5 favorites
  app.get("/", function(req, res) {
    db.Recipe.findAll({where: {favorites: {[Sequelize.Op.gte]: 5}}}).then(function(dbResults) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbResults
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/recipe/:id", function(req, res) {
    db.Recipe.findOne({ where: { id: req.params.id } }).then(function(dbResults) {
      res.render("singleRecipe", {
        example: dbResults
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
