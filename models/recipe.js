module.exports = function (sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },   
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
    process: DataTypes.STRING,
    // counting users' favorite times 
    favorites: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  return Recipe;
};
