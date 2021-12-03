const {sequelize, DataTypes, Model} = require('./db')

//create model for customers in our database
class Customer extends Model {
    //add custom query methods here
}

//create attributes for model using init method
Customer.init({
    customer_name: DataTypes.STRING,
    payment_type: DataTypes.STRING,
    customer_address: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    waiter_id:DataTypes.INTEGER
}, 
{
    sequelize, //specifies what database our model is stored in
    timestamps: false
})

module.exports = {Customer}