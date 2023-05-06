var repo = require("../repositories/foods_repository.js")

const validation = require("../validations/validater.js")
const validationFood = require("../validations/validate_food.js")

module.exports = {
    getFood: function (req, res, page, pageSize) {
        repo.getFood(page, pageSize).then(food => {
            res.send({
                success: true,
                message: "Food found lasjgh",
                data: food
            })
        })
    },

    genFood: function () {
        repo.genFood()
    },

    getOneFood: function (req, res) {
        var id = req.params.id
        
        repo.getOneFood(id).then(food => {
            if (food) {
                res.send({
                    success: true,
                    message: "Food found successfully",
                    data: food
                })
            } else {
                res.send({
                    success: false,
                    message: "Food not found"
                })
            }
        })
    },

    createFood: function (req, res) {
        var id = req.body.id
        var name = req.body.name
        var brand = req.body.brand
        var price = req.body.price
        var quantity = req.body.quantity
        var type = req.body.type

        const errors = validationFood.validateFood(req.body)

        if (Object.keys(errors).length > 0) {
            res.status(400).send({ success: false, errors: errors })
        } else {
            repo.createFood(id, name, brand, price, quantity, type)
            res.send({
                success: true,
                message: "Food created successfully"
            })
        }
    },

    deleteFood: function (req, res) {
        var id = req.params.id

        validation.isIdInUse(id, "food").then(result => {
            if (result) {
                repo.deleteFood(id)
                res.send({
                    success: true,
                    message: "Food deleted successfully"
                })
            } else {
                res.send({
                    success: false,
                    message: "Food not found"
                })
            }
        })
    },

    updateFood: function (req, res) {
        var id = req.params.id
        var name = req.body.name
        var brand = req.body.brand
        var price = req.body.price
        var quantity = req.body.quantity
        var type = req.body.type

        const errors = validationFood.validateFood(req.body)
        const idErrors = validationFood.validateId(id)
        const allErrors = Object.assign(errors, idErrors)

        if (Object.keys(allErrors).length > 0) {
            res.status(400).send({ success: false, errors: allErrors })
        } else {
            repo.updateFood(id, name, brand, price, quantity, type)
            res.send({
                success: true,
                message: "Food updated successfully"
            })
        }
    }
}