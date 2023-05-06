const Validation = require('../validations/validater.js')

class ValidationFood {
    static async validateId(id) {
        const errors = {}

        if (!id) {
            errors.id = "ID is required"
        } else if (!Validation.validateNumber(id)) {
            errors.id = "ID should be a number greater than 0."
        } else if (!await Validation.isIdInUse(id, "food")) {
            errors.id = "ID does not exist"
        }

        return errors
    }

    static validateFood(food) {
        var name = food.name
        var brand = food.brand
        var price = food.price
        var quantity = food.quantity
        var type = food.type
        
        const errors = {}

        if (!name) {
            errors.name = "Name is required"
        } else if (!Validation.validateName(name)) {
            errors.name = "Name must contain only letters, spaces, and dashes, and be at least 3 characters long."
        }

        if (!brand) {
            errors.brand = "Brand is required"
        } else if (!Validation.validateName(brand)) {
            errors.brand = "Brand must contain only letters, spaces, and dashes, and be at least 3 characters long."
        }

        if (!price) {
            errors.price = "Price is required"
        } else if (!Validation.validateNumber(price)) {
            errors.price = "Price should be a number greater than 0."
        }

        if (!quantity) {
            errors.quantity = "Quantity is required"
        } else if (!Validation.validateNumber(quantity)) {
            errors.quantity = "Quantity should be a number greater than 0."
        }

        if (!type) {
            errors.type = "Type is required"
        } else if (!Validation.validateName(type)) {
            errors.type = "Type must contain only letters, spaces, and dashes, and be at least 3 characters long."
        }

        return errors
    }
}

module.exports = ValidationFood