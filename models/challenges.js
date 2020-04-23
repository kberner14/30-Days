module.exports = function(sequelize, DataTypes) {
  var Challenge = sequelize.define("Challenge", {
    // The email cannot be null, and must be a proper email before creation
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    task: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    increment: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Challenge;
};
