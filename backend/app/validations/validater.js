const owner = require('../models/owners_model.js')
const cat = require('../models/cats_model.js')
const food = require('../models/foods_model.js')
const foodCat = require('../models/foods_for_cats_model.js')

class Validation {
    static validateEmail(email) {
        var re = /\S+@\S+\.\S+/
        return re.test(email)
    }

    static validatePhone(phone) {
        var re = /^\d{8}$/
        return re.test(phone)
    }

    static validateName(name) {
        var re = /^[a-zA-Z\s\-]{3,}$/
        return re.test(name)
    }

    static validateDescr(description) {
        var re = /^[a-zA-Z\s\.\-]{50,100}$/
        return re.test(description)
    } 

    static validateNumber(number) {
        return !isNaN(number) && number > 0
    }

    static validateDate(date) {
        var re = /^\d{4}-\d{2}-\d{2}$/
        return re.test(date)
    }

    static validateAddress(address) {
        var re = /^[a-zA-Z0-9\s\.\-]{5,}$/
        return re.test(address)
    }

    static validateDateRange(dateString) {
        var date = new Date(dateString)

        if (isNaN(date.getTime())) {
            return false
        }

        var minDate = new Date('2000-01-01')
        var maxDate = new Date()

        return date >= minDate && date <= maxDate
    }

    static isEmailInUse(email) {
        return owner.findOne({ where: { email: email } })
    }

    static isPhoneInUse(phone) {
        return owner.findOne({ where: { phone: phone } })
    }

    static async isIdInUse(id, type) {
        if (type == "owner") {
            return owner.findOne({ where: { id: id } })
        } else if (type == "cat") {
            return cat.findOne({ where: { id: id } })
        } else if (type == "food") {
            return food.findOne({ where: { id: id } })
        } else if (type == "foodForCat") {
            return foodCat.findOne({ where: { id: id } })
        }

        return null
    }
}

module.exports = Validation
