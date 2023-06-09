var repoOwner = require("../repositories/owners_repository.js")

const dbCats = require('../database/cats_database.js')
const validation = require('../validations/validater.js')
const validationOwner = require('../validations/validate_owner.js')
const validationCat = require('../validations/validate_cat.js')

module.exports = {
    getOwner: function (req, res, page, pageSize) {
        repoOwner.getOwner(page, pageSize).then(owners => {
            res.send({
                success: true,
                message: "Owners found successfully",
                data: owners
            })
        })
    },

    genOwner: function () {
        repoOwner.genOwner()
    },

    getOneOwner: function (req, res) {
        var id = req.params.id

        repoOwner.getOneOwner(id).then(owner => {
            if (owner != null) {
                dbCats.getByTypeCat("ownerId", id).then(cats => {
                    owner.dataValues["catsData"] = { noCats: cats.length, cats: cats }
                    res.send({
                        success: true,
                        message: "Owner found successfully",
                        data: owner
                    })
                })
            } else {
                res.send({
                    success: false,
                    message: "Owner not found"
                })
            }
        })
    },

    createOwner: async function (req, res) {
        var firstName = req.body.firstName
        var lastName = req.body.lastName
        var address = req.body.address
        var phone = req.body.phone
        var email = req.body.email
        var age = req.body.age

        const errors = validationOwner.validateOwner(req.body)
        const phoneErrors = await validationOwner.validatePhoneOwner(phone)
        const emailErrors = await validationOwner.validateEmailOwner(email)
        const allErrors = Object.assign(errors, phoneErrors, emailErrors)

        if (Object.keys(allErrors).length > 0) {
            res.status(400).send({ success: false, errors: allErrors })
        } else {
            repoOwner.createOwner(firstName, lastName, address, phone, email, age)
            res.send({
                success: true,
                message: "Owner created successfully"
            })
        }
    },

    deleteOwner: function (req, res) {
        var id = req.params.id

        validation.isIdInUse(id, "owner").then(owner => {
            if (owner) {
                repoOwner.deleteOwner(id)
                res.send({
                    success: true,
                    message: "Owner deleted successfully"
                })
            } else {
                res.send({
                    success: false,
                    message: "Owner not found"
                })
            }
        })
    },

    updateOwner: async function (req, res) {
        var id = req.params.id
        var firstName = req.body.firstName
        var lastName = req.body.lastName
        var address = req.body.address
        var phone = req.body.phone
        var email = req.body.email
        var age = req.body.age

        const errors = validationOwner.validateOwner(req.body)
        const phoneErrors = await validationOwner.validatePhoneOwner(phone)
        const emailErrors = await validationOwner.validateEmailOwner(email)
        const idErrors = await validationOwner.validateId(id)
        const allErrors = Object.assign(errors, phoneErrors, emailErrors, idErrors)

        if (Object.keys(allErrors).length > 0) {
            res.status(400).send({ success: false, errors: allErrors })
        } else {
            repoOwner.updateOwner(id, firstName, lastName, address, phone, email, age)
            res.send({
                success: true,
                message: "Owner updated successfully"
            })
        }
    },

    getStatistics: function (req, res, page, pageSize) {
        const listOwners = repoOwner.getStatisticReport(page, pageSize).then(owners => {
            if (req === undefined || res === undefined) {
                return owners.owners
            } else {
                if (owners) {
                    res.send({
                        success: true,
                        message: "All owners order by average age of their cats fetched successfully",
                        data: owners
                    })
                } else {
                    res.send({
                        success: false,
                        message: "Owners not found"
                    })
                }
            }
        })

        return listOwners
    },

    changeOwnerIdOfCats: function (req, res) {
        var ownerid = req.params.id
        var cats_list = req.body.id

        validation.isIdInUse(ownerid, "owner").then(owner => {
            if (owner) {
                repoOwner.changeOwnerIdOfCats(ownerid, cats_list).then(list => {
                    res.send({
                        success: true,
                        message: "Owner id of cats updated successfully",
                        data: list
                    })
                })
            } else {
                res.send({
                    success: false,
                    message: result
                })
            }
        })
    },

    createCatForOwner: function (req, res) {
        var ownerid = req.params.id
        var cats_list = req.body

        validation.isIdInUse(ownerid, "owner").then((owner) => {
            if (owner) {
                repoOwner.createCatForOwner(ownerid, cats_list).then((list) => {
                    const dataWithoutIds = list.map(({ id, ...rest }) => rest)
                    res.send({
                        success: true,
                        message: "Cats created successfully",
                        data: dataWithoutIds,
                    })
                })
            } else {
                res.send({
                    success: false,
                    message: "Owner not found",
                })
            }
        })
    }
}