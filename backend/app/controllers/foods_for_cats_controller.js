var repo = require("../repositories/foods_for_cats_repository.js")

var validate = require("../validations/validater.js")
var validateFoodCat = require("../validations/validate_food_for_cat.js")

module.exports = {
    getFoodCat: function (_, res) {
        repo.getFoodCat().then(foodCat => {
            res.send({
                success: true,
                message: "Food for cat found successfully",
                data: foodCat
            })
        })
    },

    genFoodCat: function () {
        repo.genFoodCat()
    },

    getOneFoodCat: function (req, res) {
        var id = req.params.id

        repo.getOneFoodCat(id).then(foodCat => {
            if (foodCat) {
                res.send({
                    success: true,
                    message: "Food for cat found successfully",
                    data: foodCat
                })
            } else {
                res.send({
                    success: false,
                    message: "Food for cat not found"
                })
            }
        })
    },

    createFoodCat: function (req, res) {
        var id = req.body.id
        var catId = req.body.catId
        var foodId = req.body.foodId
        var purchased = req.body.purchased
        var place = req.body.place

        const errors = validateFoodCat.validateFoodForCat(req.body)
        
        if (Object.keys(errors).length > 0) {
            res.status(400).send({ success: false, errors: errors })
        } else {
            repo.createFoodCat(id, catId, foodId, purchased, place)
            res.send({
                success: true,
                message: "Food for cat created successfully"
            })
        }
    },

    deleteFoodCat: function (req, res) {
        var id = req.params.id

        validate.isIdInUse(id, "foodForCat").then(foodCat => {
            if (foodCat) {
                repo.deleteFoodCat(id)
                res.send({
                    success: true,
                    message: "Food for cat deleted successfully"
                })
            } else {
                res.send({
                    success: false,
                    message: "Food for cat not found"
                })
            }
        })
    },

    updateFoodCat: function (req, res) {
        var id = req.params.id
        var catId = req.body.catId
        var foodId = req.body.foodId
        var purchased = req.body.purchased
        var place = req.body.place

        const errors = validateFoodCat.validateFoodForCat(req.body)
        const catIdErrors = validateFoodCat.validateId(catId)
        const foodIdErrors = validateFoodCat.validateId(foodId)
        const idErrors = validateFoodCat.validateId(id)
        const allErrors = Object.assign(errors, catIdErrors, foodIdErrors, idErrors)

        if (Object.keys(allErrors).length > 0) {
            res.status(400).send({ success: false, errors: allErrors })
        } else {
            repo.updateFoodCat(id, catId, foodId, purchased, place)
            res.send({
                success: true,
                message: "Food for cat updated successfully"
            })
        }
    }
}