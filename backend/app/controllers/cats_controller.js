var repo = require("../repositories/cats_repository.js")

const dbOwner = require("../database/owners_database.js")
const validation = require("../validations/validater.js")
const validationCat = require("../validations/validate_cat.js")

module.exports = {
    getCat: function (req, res, page, pageSize) {
        repo.getCat(page, pageSize).then(cats => {
            res.send({
                success: true,
                message: "Cats found successfully",
                data: cats
            })
        })
    },

    genCat: function () {
        repo.genCat()
    },

    getOneCat: function (req, res) {
        var id = req.params.id

        repo.getOneCat(id).then(cat => {
            if (cat != null) {
                dbOwner.getByTypeOwner("id", cat.ownerId).then(owner => {
                    cat.dataValues["ownerData"] = { owner: owner }
                    res.send({
                        success: true,
                        message: "Cat found successfully",
                        data: cat
                    })
                })
            } else {
                res.send({
                    success: false,
                    message: "Cat not found"
                })
            }
        })
    },

    createCat: async function (req, res) {
        var name = req.body.name
        var age = req.body.age
        var color = req.body.color
        var breed = req.body.breed
        var weight = req.body.weight
        var description = req.body.description
        var ownerId = req.body.ownerId

        const errors = validationCat.validateCat(req.body)
        const ownerErrors = await validationCat.validateOwner(ownerId)
        const allErrors = Object.assign(errors, ownerErrors)

        if (Object.keys(allErrors).length > 0) {
            res.status(400).send({ success: false, errors: allErrors })
        } else {
            repo.createCat(name, age, color, breed, weight, description, ownerId)
            res.send({
                success: true,
                message: "Cat created successfully"
            })
        }
    },


    deleteCat: function (req, res) {
        var id = req.params.id

        validation.isIdInUse(id, "cat").then(result => {
            if (result) {
                repo.deleteCat(id)
                res.send({
                    success: true,
                    message: "Cat deleted successfully"
                })
            } else {
                res.send({
                    success: false,
                    message: "Cat not found"
                })
            }
        })
    },

    updateCat: async function (req, res) {
        var id = req.params.id
        var name = req.body.name
        var age = req.body.age
        var color = req.body.color
        var breed = req.body.breed
        var weight = req.body.weight
        var description = req.body.description
        var ownerId = req.body.ownerId

        const errors = validationCat.validateCat(req.body)
        const ownerErrors = await validationCat.validateOwner(ownerId)
        const idErrors = await validationCat.validateId(id)

        const allErrors = Object.assign(errors, ownerErrors, idErrors)

        if (Object.keys(allErrors).length > 0) {
            res.status(400).send({ success: false, errors: allErrors })
        } else {
            repo.updateCat(id, name, age, color, breed, weight, description, ownerId)
            res.send({
                success: true,
                message: "Cat updated successfully"
            })
        }
    },

    filterCat: function (req, res, page, pageSize) {
        var weight

        try {
            if (res === undefined) {
                if (req < 0) {
                    throw new Error()
                }
                weight = parseInt(req)
            } else {
                if (req.params.weight < 0) {
                    throw new Error()
                }
                weight = parseInt(req.params.weight)
            }

            if (weight === 0 || weight % 1 === 0) {
                const listCats = repo.filterCatByWeight(weight, page, pageSize).then(cats => {
                    if (res === undefined) {
                        return cats.cats
                    } else {
                        if (cats) {
                            res.send({
                                success: true,
                                message: "Cats found successfully",
                                data: cats
                            })
                        } else {
                            res.send({
                                success: false,
                                message: "Cats not found"
                            })
                        }
                    }
                })

                return listCats
            } else {
                throw new Error()
            }
        } catch (err) {
            res.send({
                success: false,
                message: "Cats not found",
            })
            return
        }
    },

    getStatisticsBreed: function (req, res, page, pageSize) {
        var breed

        if (res === undefined) {
            breed = req
        } else {
            breed = req.params.breed
        }

        const listCats = repo.getStatisticReportBreed(breed, page, pageSize).then(cats => {
            if (res === undefined) {
                return cats.cats
            } else {
                if (cats) {
                    res.send({
                        success: true,
                        message: "All cats with the " + breed + " breed have been found successfully",
                        data: cats
                    })
                } else {
                    res.send({
                        success: false,
                        message: "No owner name have been found"
                    })
                }
            }
        })

        return listCats
    }
}