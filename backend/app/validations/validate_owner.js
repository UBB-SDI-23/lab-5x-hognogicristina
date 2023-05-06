const Validation = require('../validations/validater.js')

class ValidationOwner {
    static async validateEmailOwner(email) {
        const errors = {}

        if (!email) {
            errors.email = "Email is required"
        } else if (!Validation.validateEmail(email)) {
            errors.email = "Email does not have the correct format (e.g.: email@gmail.com/ email@yahoo.com)."
        } else if (await Validation.isEmailInUse(email)) {
            errors.email = "Email already exist. Try another one."
        }

        return errors
    }

    static async validatePhoneOwner(phone) {
        const errors = {}

        if (!phone) {
            errors.phone = "Phone is required"
        } else if (!Validation.validatePhone(phone)) {
            errors.phone = "Phone does not have the correct format (e.g.: 12345678)."
        } else if (await Validation.isPhoneInUse(phone)) {
            errors.phone = "Phone already exist. Try another one."
        }

        return errors
    }

    static async validateId(id) {
        const errors = {}

        if (!id) {
            errors.id = "ID is required"
        } else if (!Validation.validateNumber(id)) {
            errors.id = "ID should be a number greater than 0."
        } else if (!await Validation.isIdInUse(id, "owner")) {
            errors.id = "ID does not exist"
        }

        return errors
    }

    static validateOwner(owner) {
        var firstName = owner.firstName
        var lastName = owner.lastName
        var address = owner.address
        var age = owner.age

        const errors = {}

        if (!firstName) {
            errors.firstName = "First name is required"
        } else if (!Validation.validateName(firstName)) {
            errors.firstName = "First name must contain only letters, spaces, and dashes, and be at least 3 characters long."
        }

        if (!lastName) {
            errors.lastName = "Last name is required"
        } else if (!Validation.validateName(lastName)) {
            errors.lastName = "Last name must contain only letters, spaces, and dashes, and be at least 3 characters long."
        } 

        if (!address) {
            errors.address = "Address is required"
        } else if (!Validation.validateAddress(address)) {
            errors.address = "Address must contain only numbers, letters, spaces, and dashes, and be at least 5 characters long."
        } 

        if (!age) {
            errors.age = "Age is required"
        } else if (!Validation.validateNumber(age)) {
            errors.age = "Age should be a number greater than 0."
        }

        return errors
    }
}

module.exports = ValidationOwner