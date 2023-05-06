const food = require('../models/foods_model.js')
require('./database.js')

async function getFoods(page, pageSize) {
    const offset = (page - 1) * pageSize
    const limit = pageSize
    const foods = await food.findAll({ offset, limit })
    const count = await food.count()
    const totalPages = Math.ceil(count / pageSize)

    return {
        results: foods,
        pageInfo: {
            page,
            pageSize,
            totalPages,
            count,
        },
    }
}

async function getOneFoodById(id) {
    return food.findOne({ where: { id: id } })
}

async function countRowsFood() {
    return food.count()
}

async function addFood(food) {
    return food.create(food)
}

async function deleteFood(id) {
    return food.destroy({ where: { id: id } })
}

async function updateFood(food) {
    return food.update(
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