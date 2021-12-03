const { sequelize, DataTypes, Model } = require("./db");

class Waiter extends Model {}

Waiter.init(
  {
    waiter_name: DataTypes.STRING,  
    waiter_salary:DataTypes.INTEGER
  },
  {
    sequelize,
    timestamps: false,
  }
);

module.exports = { Waiter };