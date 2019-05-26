var db = require("../models");
var Sequelize = require("sequelize");
var path = require("path");
module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "../public/indedex.html"));
  });
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
