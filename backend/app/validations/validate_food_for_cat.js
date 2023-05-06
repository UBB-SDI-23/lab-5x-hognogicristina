const Validation = require('../validations/validater.js')

class ValidationFoodForCat {
    static async validateFood(foodId) {
        const errors = {}

        if (!foodId) {
            errors.foodId = "Food ID is required"
        } else if (!Validation.validateNumber(foodId)) {
            errors.foodId = "Food ID should be a number greater than 0."
        } else if (!await Validation.isIdInUse(foodId, "food")) {
            errors.foodId = "Food ID does not exist"
        }

        return errors
    }

    static async validateCat(catId) {
        const errors = {}

        if (!catId) {
            errors.catId = "Cat ID is required"
        } else if (!Validation.validateNumber(catId)) {
            errors.catId = "Cat ID should be a number greater than 0."
        } else if (!await Validation.isIdInUse(catId, "cat")) {
            errors.catId = "Cat ID does not exist"
        }

        return errors
    }

    static async validateId(id) {
        const errors = {}

        if (!id) {
            errors.id = "ID is required"
        } else if (!Validation.validateNumber(id)) {
            errors.id = "ID should be a number greater than 0."
        } else if (!await Validation.isIdInUse(id, "foodCat")) {
            errors.id = "ID does not exist"
        }

        return errors
    }

    static validateFoodForCat(foodForCat) {
        var purchased = foodForCat.purchased
        var place = foodForCat.place

        const errors = {}

        if (!purchased) {
            errors.purchased = "Purchased is required"
        } else if (!Validation.validateDate(purchased)) {
            errors.purchased = "Purchased must be a date in the format YYYY-MM-DD."
        }

        if (!place) {
            errors.place = "Place is required"
        } else if (!Validation.validateName(place)) {
            errors.place = "Place must contain only letters, spaces, and dashes, and be at least 3 characters long."
        }

        return errors
    }
}

module.exports = ValidationFoodForCat