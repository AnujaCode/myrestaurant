//import the associated models from index.js
const {Customer,Menu, sequelize} = require('./index')
const {Meal} = require('./meal')
const {Chef} = require('./chef')
//const {Customer} = require('./customer')
const {Waiter} = require('./waiter')

//const {sequelize} = require('./db')

//test musician database CRUD
describe('Restaurant Database', () => {

    beforeAll(async() => {
        //reset database
        await sequelize.sync({force:true})
        //create array of bands
        const arrayOfWaiter = [
                 {waiter_name: 'James', waiter_salary: 700},
                 {waiter_name: 'Cathy', waiter_salary: 1000},
                 {waiter_name: 'Jimmy', waiter_salary: 800},
                 {waiter_name: 'James', waiter_salary: 700},
        ]
        //create array of customers
        const arrayOfCustomer =[
            {customer_name: 'Anuja', payment_type: 'Card', customer_address: "101 main street", phone_number : 123456789, waiter_id : 1},
            {customer_name: 'Crystal', payment_type: 'Card', customer_address: "500 apple aver", phone_number : 659384567, waiter_id : 1},
            {customer_name: 'Nahima', payment_type: 'Cash', customer_address: "200 river Rd", phone_number : 987654321, waiter_id : 1},
            {customer_name: 'Lamin', payment_type: 'Cash', customer_address: "2304 main street", phone_number : 342516789, waiter_id : 2}
           
        ]
        //
        const arrayOfMenu = [
            {food_name: 'Eggs', chef_id: '2', price: 2},
            {food_name: 'Pancakes', chef_id: '3', price: 5},
            {food_name:  'Burger', chef_id: '3', price: 6},
            {food_name: 'Fries', chef_id: '2', price: 3},
            {food_name: 'Pasta', chef_id: '1', price: 8},
            {food_name: 'Daquiri', chef_id: '3', price: 6},
            {food_name: 'Steak', chef_id: '4', price: 8},
            {food_name: 'Martini', chef_id: '1', price: 5}
   ]
        //add arrays to database
        await Waiter.bulkCreate(arrayOfWaiter)
        await Customer.bulkCreate(arrayOfCustomer)
      //  await Menu.bulkCreate(arrayOfMenu)

    })

    //create instances of Customer Model for testin
    test('Customers have name', async() => {
        //read test instance from db
        const testCustomer = await Customer.findOne({
            where: {customer_name: 'Anuja'}
    });
        expect(testCustomer.customer_name).toBe('Anuja')
    })

    test('Customers have address', async() => {
        //read test instance from db
        const testCustomer = await Customer.findOne({where: {customer_address: '101 main street'}
    });
        expect(testCustomer.customer_address).toBe('101 main street')
    })

    test("waiter has a name", async () => {
        const testWaiter = await Waiter.findOne({
          where: {
            waiter_name: "James",
           
          },
      });
      expect(testWaiter.waiter_name).toBe("James");
    }) 

    test("waiter has a salary", async () => {
      const testWaiter = await Waiter.findOne({
        where: {
          
            waiter_salary: 700,
        },
    });
    expect(testWaiter. waiter_salary).toBe(700);
})

//  //create instances of Menu Model for testin
//  test('Mune has food-name', async() => {
//     //read test instance from db
//     const testMenu = await Menu.findOne({
//         where: {food_name: 'Eggs'}
// });
//     expect(testMenu.food_name).toBe('Eggs')
// })

// test('Menu has price', async() => {
//     //read test instance from db
//     const testMenu = await Menu.findOne({where: {price: 2}
// });
//     expect(testMenu.price).toBe(2)
// })



    test('Has a chef', async() => {
        await Chef.bulkCreate([{chef_name: 'Lamin', chef_speciality: 'Sous-Chef', chef_salary : 5000},
                            {chef_name: 'Crystal', chef_speciality: 'Dessert', chef_salary : 6000},
                            {chef_name: 'Anuja', chef_speciality: 'Entree',chef_salary : 7000},
                            {chef_name: 'Nahima', chef_speciality: 'Sauce',chef_salary : 9000}])
               const testChef = await Chef.findOne({
              where: {
                 chef_name: 'Lamin'
              }
            });
         expect(testChef.chef_name).toBe('Lamin')
         expect(testChef.chef_speciality).toBe('Sous-Chef')
     
     })

     test('Has a meal', async() => {
        await Meal.bulkCreate([{breakfast_menu: 'egg muffin', lunch_menu: 'tacos', dinner_menu: 'spaghetti'},
                                 {breakfast_menu: 'French toast', lunch_menu: 'French Dip Sandwiches', dinner_menu: 'chicken'}])
               const testMeal = await Meal.findOne({
              where: {
                 breakfast_menu: 'egg muffin'
              }
            });
         expect(testMeal.breakfast_menu).toBe('egg muffin')
         expect(testMeal.lunch_menu).toBe('tacos')
         expect(testMeal.dinner_menu).toBe('spaghetti')
     
     })

    

    test('Waiters can have many customers', async()=> {
        //read test waiter instance from db
        const testWaiter = await Waiter.findOne({where: {waiter_name: 'James'}});
        //create 2 test instances of Customer
        const testCustomer1 = await Customer.findOne({where: {customer_name: 'Anuja'}})
        const testCustomer2 = await Customer.findOne({where: {customer_name: 'Nahima'}})
        //add test cutomers to test waiters
        //magic sequelize add method
        await testWaiter.addCustomer(testCustomer1)
        await testWaiter.addCustomer(testCustomer2)
        //retrieve list of Customers with the waiters
        const customerList = await testWaiter.getCustomers()
        //assert that the list of customer is length 2
        expect(customerList.length).toBe(2)
        //assert that the 0th index of the array customerlist is an instance of the model Customer
        expect(customerList[0] instanceof Customer).toBeTruthy()
        expect(customerList[0].customer_name).toMatch('Anuja')

    })


})

