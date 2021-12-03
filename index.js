const {sequelize, DataTypes, Model} = require('./db')
//import models
const { Customer } = require('./customer')
const { Waiter } = require('./waiter')

//associate models
//adds foreign key to musician table connecting a musician instance to a specific band
Customer.belongsTo(Waiter)
//gives us sequelize methods for a one to many relationship
Waiter.hasMany(Customer)

//export models with added associations
module.exports = {Customer, Waiter, sequelize}