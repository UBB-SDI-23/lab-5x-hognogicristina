const Validation = require('../validations/validater.js')
const owner = require('../models/owners_model.js')

class ValidationCat {
    static async validateOwner(ownerId) {
        const errors = {}

        if (!ownerId) {
            errors.ownerId = "Owner id is required"
        } else if (!Validation.validateNumber(ownerId)) {
            errors.ownerId = "Owner id should be a number greater than 0."
        } else if (!await Validation.isIdInUse(ownerId, "owner")) {
            errors.ownerId = "Owner id does not exist"
        }

        return errors
    }

    static async validateId(id) {
        const errors = {}

        if (!id) {
            errors.id = "ID is required"
        } else if (!Validation.validateNumber(id)) {
            errors.id = "ID should be a number greater than 0."
        } else if (!await Validation.isIdInUse(id, "cat")) {
            errors.id = "ID does not exist"
        }

        return errors
    }

    static validateCat(cat) {
        var name = cat.name
        var age = cat.age
        var color = cat.color
        var breed = cat.breed
        var weight = cat.weight
        var description = cat.description

        const errors = {}

        if (!name) {
            errors.name = "Name is required"
        } else if (!Validation.validateName(name)) {
            errors.name = "Name must contain only letters, spaces, and dashes, and be at least 3 characters long."
        }

        if (!age) {
            errors.age = "Age is required"
        } else if (!Validation.validateNumber(age)) {
            errors.age = "Age should be a number greater than 0."
        }

        if (!color) {
            errors.color = "Color is required"
        } else if (!Validation.validateName(color)) {
            errors.color = "Color must contain only letters, spaces, and dashes, and be at least 3 characters long."
        }

        if (!breed) {
            errors.breed = "Breed is required"
        } else if (!Validation.validateName(breed)) {
            errors.breed = "Breed must contain only letters, spaces, and dashes, and be at least 3 characters long."
        }

        if (!weight) {
            errors.weight = "Weight is required"
        } else if (!Validation.validateNumber(weight)) {
            errors.weight = "Weight should be a number greater than 0."
        }

        if (!description) {
            errors.description = "Description is required"
        } else if (!Validation.validateDescr(description)) {
            errors.description = "Description must contain only letters, spaces, periods, and dashes, and be between 50 and 100 characters long."
        }

        return errors
    }
}

module.exports = ValidationCat
