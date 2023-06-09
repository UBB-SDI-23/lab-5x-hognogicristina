const owner = require('../models/owners_model.js')
const cat = require('../models/cats_model.js')
const Sequelize = require('sequelize')
require('./database.js')

async function getOwners(page, pageSize) {
    const offset = (page - 1) * pageSize
    const limit = pageSize
    var owners = await owner.findAll({
        offset,
        limit,
        include: [{
            model: cat,
            as: 'cats'
        }]
    })

    const count = await owner.count()
    const totalPages = Math.ceil(count / pageSize)

    owners.forEach(owner => {
        owner.catsCount = owner.cats.length
        delete owner.cats
    })

    return {
        results: owners,
        pageInfo: {
            page,
            pageSize,
            totalPages,
            count,
        },
    }
}

async function getOneOwnerById(id) {
    return owner.findOne({ where: { id: id } })
}

async function countRowsOwner() {
    return owner.count()
}

async function addOwner(owners) {
    return owner.create(owners)
}

async function deleteOwner(id) {
    return owner.destroy({ where: { id: id } })
}

async function updateOwner(owners) {
    return owner.update(
        { firstName: owners.firstName, lastName: owners.lastName, address: owners.address, phone: owners.phone, email: owners.email, age: owners.age },
        { where: { id: owners.id } }
    )
}

async function getByTypeOwner(typeName, type) {
    return owner.findAll({ where: { [typeName]: type } })
}

async function getStatisticReport(page, pageSize) {
    const offset = (page - 1) * pageSize
    const limit = pageSize

    owner.hasMany(cat, { foreignKey: 'ownerId' })
    cat.belongsTo(owner, { foreignKey: 'ownerId' })

    const count = await owner.count()
    const totalPages = Math.ceil(count / pageSize)

    const result = await owner.findAll({
        attributes: ['id', 'firstName', 'lastName', 'address', 'phone', 'email', 'age', [Sequelize.literal('(SELECT AVG(age) FROM cats WHERE cats.ownerId = owner.id)'), 'averageAge']],
        include: [{
            model: cat,
            attributes: []
        }],
        group: ['owner.id'],
        offset,
        limit
    })

    return {
        owners: result,
        pageInfo: {
            page,
            pageSize,
            totalPages,
            count,
        },
    }
}


async function changeOwnerIdOfCats(id_owner, cats_list) {
    id_owner = parseInt(id_owner)
    const cats = await cat.findAll({ where: { id: cats_list } })
    let list = []

    cats.forEach(cats => {
        cats.ownerId = id_owner
        cats.save()
        list.push(cats.dataValues)
    })

    return list
}

async function createCatForOwner(id_owner, cats_list) {
    let list = []

    cats_list.cats_list.forEach(cats => {
        let newCat = new cat({ name: cats.name, age: cats.age, color: cats.color, breed: cats.breed, weight: cats.weight, description: cats.description, ownerId: id_owner })
        newCat.save()
        list.push(newCat.dataValues)

    })

    return list
}

module.exports = {
    getOwners: getOwners,
    getOneOwnerById: getOneOwnerById,
    countRowsOwner: countRowsOwner,
    addOwner: addOwner,
    deleteOwner: deleteOwner,
    updateOwner: updateOwner,
    getByTypeOwner: getByTypeOwner,
    getStatisticReport: getStatisticReport,
    changeOwnerIdOfCats: changeOwnerIdOfCats,
    createCatForOwner: createCatForOwner
}
