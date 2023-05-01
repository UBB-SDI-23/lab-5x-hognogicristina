const owner = require("../models/owners_model.js")
const db = require("../database/owners_database.js")

var owners = []

module.exports = {
    genOwner: function () {
        owners = []

        let owner1 = new owner({ firstName: "Oliver", lastName: "Smith", address: "34 Cook Street", phone: 71838750, email: "olism@gmail.com", age: 34 })
        let owner2 = new owner({ firstName: "John", lastName: "Karev", address: "12 Main Street", phone: 71838751, email: "johnykav@yahoo.com", age: 40 })
        let owner3 = new owner({ firstName: "Mary", lastName: "Grey", address: "23 Park Avenue", phone: 71838752, email: "marygrey@gmail.com", age: 34 })
        let owner4 = new owner({ firstName: "Meredith", lastName: "Grey", address: "34 Cook Street", phone: 71838753, email: "mergrey@gmail.com", age: 16 })
        let owner5 = new owner({ firstName: "Alex", lastName: "Karev", address: "12 Main Street", phone: 71838754, email: "karev@yahoo.com", age: 89 })
        let owner6 = new owner({ firstName: "Jose", lastName: "Wilson", address: "23 Park Avenue", phone: 71838755, email: "jo@yahoo.com", age: 35 })
        let owner7 = new owner({ firstName: "Richard", lastName: "Webber", address: "34 Cook Street", phone: 71838756, email: "rich@yahoo.com", age: 89 })
        let owner8 = new owner({ firstName: "Jackson", lastName: "Avery", address: "12 Main Street", phone: 71838757, email: "jack@gmail.com", age: 34 })
        let owner9 = new owner({ firstName: "April", lastName: "Kepner", address: "23 Park Avenue", phone: 71838758, email: "april@yahoo.com", age: 16 })
        let owner10 = new owner({ firstName: "Callie", lastName: "Torres", address: "34 Cook Street", phone: 71838759, email: "callie@gmail.com", age: 89 })
        let owner11 = new owner({ firstName: "Tiberiu", lastName: "Craiu", address: "12 Motilor", phone: 70888726, email: "tibi@gmail.com", age: 22 })

        owners.push(owner1)
        owners.push(owner2)
        owners.push(owner3)
        owners.push(owner4)
        owners.push(owner5)
        owners.push(owner6)
        owners.push(owner7)
        owners.push(owner8)
        owners.push(owner9)
        owners.push(owner10)
        owners.push(owner11)

        owners.forEach((o) => {
            db.addOwner(o.dataValues)
        })
    },

    getOwner: async function (page, pageSize) {
        const { results, pageInfo } = await db.getOwners(page, pageSize)
        owners = results

        return {
            owners,
            pageInfo,
        }
    },

    getOneOwner: async function (id) {
        return await db.getOneOwnerById(id)
    },

    createOwner: async function (firstName, lastName, address, phone, email, age) {
        let newOwner = new owner({ firstName: firstName, lastName: lastName, address: address, phone: phone, email: email, age: age })
        return await db.addOwner(newOwner.dataValues)
    },

    deleteOwner: async function (id) {
        return await db.deleteOwner(id)
    },

    updateOwner: async function (id, firstName, lastName, address, phone, email, age) {
        let index = owners.filter(el => el.id == id)

        owners[index] = {
            id: parseInt(id),
            firstName: firstName,
            lastName: lastName,
            address: address,
            phone: phone,
            email: email,
            age: age
        }

        return await db.updateOwner(owners[index])
    },

    getStatisticReport: async function (page, pageSize) {
        const data = await db.getStatisticReport(page, pageSize)
        const cats = data.cats
        const pageInfo = data.pageInfo

        return {
            cats,
            pageInfo,
        }
    },

    changeOwnerIdOfCats: async function (ownerid, cats_list) {
        return await db.changeOwnerIdOfCats(ownerid, cats_list)
    },

    createCatForOwner: async function (ownerid, cats_list) {
        return await db.createCatForOwner(ownerid, cats_list)
    }
}