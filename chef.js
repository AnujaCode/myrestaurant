const {sequelize, DataTypes, Model} = require('./db')

//create model for musicians in our database
class Chef extends Model {
    //add custom query methods here
}

//create attributes for model using init method
Chef.init({
    chef_name: DataTypes.STRING,
    chef_speciality: DataTypes.STRING,
    chef_salary: DataTypes.INTEGER
}, {
    sequelize, //specifies what database our model is stored in
    timestamps: false
})

module.exports = {Chef}