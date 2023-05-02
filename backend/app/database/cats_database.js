const cat = require('../models/cats_model.js')
const owner = require('../models/owners_model.js')
const Sequelize = require('sequelize')
require('./database.js')

async function getCats(page, pageSize) {
    const offset = (page - 1) * pageSize
    const limit = pageSize
    const cats = await cat.findAll({ offset, limit })
    const count = await cat.count()
    const totalPages = Math.ceil(count / pageSize)

    return {
        results: cats,
        pageInfo: {
            page,
            pageSize,
            totalPages,
            count,
        },
    }
}

async function getOneCatById(id) {
    return cat.findOne({ where: { id: id } })
}

async function countRowsCats() {
    return cat.count()
}

async function addCat(cats) {
    return cat.create(cats)
}

async function deleteCat(id) {
    return cat.destroy({ where: { id: id } })
}

async function updateCat(cats) {
    return cat.update(
        { name: cats.name, age: cats.age, color: cats.color, breed: cats.breed, weight: cats.weight, description: cats.description, ownerId: cats.ownerId },
        { where: { id: cats.id } })
}

async function filterCatsByWeight(weight, page, pageSize) {
    const offset = (page - 1) * pageSize
    const limit = pageSize
    const { count, rows } = await cat.findAndCountAll({
        where: { weight: { [Sequelize.Op.gt]: weight } },
        limit,
        offset,
    })
    const totalPages = Math.ceil(count / pageSize)

    return {
        cats: rows,
        pageInfo: {
            page,
            pageSize,
            totalPages,
            count,
        },
    }
}

async function getByTypeCat(typeName, type) {
    return cat.findAll({ where: { [typeName]: type } })
}

async function getStatisticReportBreed(breed, page, pageSize) {
    const offset = (page - 1) * pageSize
    const limit = pageSize
    cat.belongsTo(owner, { foreignKey: 'ownerId' })

    var count = await cat.findAndCountAll({
        attributes: ['id', 'name', 'age', 'color', 'breed', 'weight', 'description', [Sequelize.fn('AVG', Sequelize.col('owner.age')), 'avgAge']],
        include: [{
            model: owner,
            attributes: ['firstName'],
        }],
        where: { breed: breed },
        group: ['owner.firstName'],
        order: [[Sequelize.fn('AVG', Sequelize.col('owner.age')), 'ASC']]
    })
    
    count = count.rows.length

    const data = await cat.findAndCountAll({
        attributes: ['id', 'name', 'age', 'color', 'breed', 'weight', 'description', [Sequelize.fn('AVG', Sequelize.col('owner.age')), 'avgAge']],
        include: [{
            model: owner,
            attributes: ['firstName'],
        }],
        where: { breed: breed },
        group: ['owner.firstName'],
        order: [[Sequelize.fn('AVG', Sequelize.col('owner.age')), 'ASC']],
        limit,
        offset
    })

    const totalPages = Math.ceil(count / pageSize)

    return {
        cats: data.rows,
        pageInfo: {
            page,
            pageSize,
            totalPages,
            count,
        },
    }
}

async function getStatisticReport


module.exports = {
    getCats: getCats,
    getOneCatById: getOneCatById,
    countRowsCats: countRowsCats,
    addCat: addCat,
    deleteCat: deleteCat,
    updateCat: updateCat,
    filterCatsByWeight: filterCatsByWeight,
    getByTypeCat: getByTypeCat,
    getStatisticReportBreed: getStatisticReportBreed
}