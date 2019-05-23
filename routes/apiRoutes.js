var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/recipes", function(req, res) {
    db.Recipe.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // get recipe by id
  app.get("/api/recipes/:id", function(req, res){
    db.Recipe.findOne({where:{id: req.params.id}}).then(function(dbExample){
      res.json(dbExample);
    });
  });

  // Create a new example
  app.post("/api/recipes", function(req, res) {
    db.Recipe.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // adding likes by id
  app.put("/api/like/:id", function(req, res){
    db.Recipe.update(req.body,
      {
        where: {
          id: req.params.id
        }
      }).then(function(dbResult){
        res.json(dbResult);
      });
  });

  // Delete an example by id
  app.delete("/api/recipes/:id", function(req, res) {
    db.Recipe.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
