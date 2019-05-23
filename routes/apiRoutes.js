var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/recipes", function(req, res) {
    db.Recipe.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/recipes", function(req, res) {
    db.Recipe.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/recipes/:id", function(req, res) {
    db.Recipe.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
