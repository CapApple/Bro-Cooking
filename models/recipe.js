module.exports = function (sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        len: [1, 50]
      }
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minutes: DataTypes.INTEGER,
    // counting users' favorite times 
    procedure: DataTypes.STRING,
    favorites: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  return Recipe;
};
