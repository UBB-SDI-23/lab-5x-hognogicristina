const foods = require('../models/foods_model.js')
require('./database.js')

async function getFoods(page, pageSize) {
    const offset = (page - 1) * pageSize
    const limit = pageSize
    const food = await foods.findAll({ offset, limit })
    const count = await foods.count()
    const totalPages = Math.ceil(count / pageSize)

    return {
        results: food,
        pageInfo: {
            page,
            pageSize,
            totalPages,
            count,
        },
    }
}

async function getOneFoodById(id) {
    return foods.findOne({ where: { id: id } })
}

async function countRowsFood() {
    return foods.count()
}

async function addFood(food) {
    return foods.create(food)
}

async function deleteFood(id) {
    return foods.destroy({ where: { id: id } })
}

async function updateFood(food) {
    return foods.update(
        { name: food.name, brand: food.brand, price: food.price, quantity: food.quantity, type: food.type },
        { where: { id: food.id } })
}

module.exports = {
    getFoods: getFoods,
    getOneFoodById: getOneFoodById,
    countRowsFood: countRowsFood,
    addFood: addFood,
    deleteFood: deleteFood,
    updateFood: updateFood
}