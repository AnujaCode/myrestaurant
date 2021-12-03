const {sequelize, DataTypes, Model} = require('./db')

//create model for musicians in our database
class Meal extends Model {
    //add custom query methods here
}

//create attributes for model using init method
Meal.init({
    breakfast_menu: DataTypes.STRING,
    lunch_menu: DataTypes.STRING,
    dinner_menu: DataTypes.INTEGER,
}, {
    sequelize, //specifies what database our model is stored in
    timestamps: false
})

module.exports = {Meal}