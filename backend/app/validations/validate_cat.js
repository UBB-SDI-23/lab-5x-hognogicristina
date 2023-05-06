const Validation = require('../validations/validater.js')

class ValidationCat {
    static validateCatAdd(cat) {
        var name = cat.name
        var age = cat.age
        var color = cat.color
        var breed = cat.breed
        var weight = cat.weight
        var description = cat.description
        var ownerId = cat.ownerId

        const errors = {}

        if (!name) {
            errors.name = "Name is required"
        } else if (!Validation.validateName(name)) {
            errors.name = "Invalid name. Name must contain only letters, spaces, and dashes, and be at least 3 characters long."
        }

        if (!age) {
            errors.age = "Age is required"
        } else if (!Validation.validateNumber(age)) {
            errors.age = "Invalid age. Age should be a number greater than 0."
        }

        if (!color) {
            errors.color = "Color is required"
        } else if (!Validation.validateName(color)) {
            errors.color = "Invalid color. Color must contain only letters, spaces, and dashes, and be at least 3 characters long."
        }

        if (!breed) {
            errors.breed = "Breed is required"
        } else if (!Validation.validateName(breed)) {
            errors.breed = "Invalid breed. Breed must contain only letters, spaces, and dashes, and be at least 3 characters long."
        }

        if (!weight) {
            errors.weight = "Weight is required"
        } else if (!Validation.validateNumber(weight)) {
            errors.weight = "Invalid weight. Weight should be a number greater than 0."
        }

        if (!description) {
            errors.description = "Description is required"
        } else if (!Validation.validateDescr(description)) {
            errors.description = "Invalid description. Description must contain only letters, spaces, periods, and dashes, and be between 50 and 100 characters long."
        }

        if (!ownerId) {
            errors.ownerId = "Owner id is required"
        } else if (!Validation.isIdInUse(ownerId, "owner")) {
            errors.ownerId = "Owner id does not exist"
        }

        return errors
    }

    static async validateCatUpdate(cat) {
        var name = cat.name
        var age = cat.age
        var color = cat.color
        var breed = cat.breed
        var weight = cat.weight
        var description = cat.description
        var ownerId = cat.ownerId

        if (name == null) {
            return "Name is required"
        } else if (age == null) {
            return "Age is required"
        } else if (color == null) {
            return "Color is required"
        } else if (breed == null) {
            return "Breed is required"
        } else if (weight == null) {
            return "Weight is required"
        } else if (description == null) {
            return "Description is required"
        } else if (ownerId == null) {
            return "Owner id is required"
        } else if (!Validation.validateName(name)) {
            return "Name should have at least 3 letters"
        } else if (!Validation.validateNumber(age)) {
            return "Age is a number greater than 0"
        } else if (!Validation.validateName(breed)) {
            return "Breed should have at least 3 letters"
        } else if (!Validation.validateNumber(weight)) {
            return "Weight is a number greater than 0"
        } else if (!Validation.validateName(color)) {
            return "Color should have at least 3 letters"
        } else if (!Validation.validateDescr(description)) {
            return "Description should have at least 50 letters and 100 max"
        } else if (!await Validation.isIdInUse(ownerId, "owner")) {
            return "Owner id does not exist"
        } else {
            return null
        }
    }

    static async validateCat(cat, type) {
        if (type == "add") {
            return this.validateCatAdd(cat)
        } else if (type == "update") {
            return await this.validateCatUpdate(cat)
        }

        return null
    }
}

module.exports = ValidationCat
