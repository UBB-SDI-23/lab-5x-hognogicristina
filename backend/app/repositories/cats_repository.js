const cat = require("../models/cats_model.js")
const db = require("../database/cats_database.js")

var cats = []

module.exports = {
    genCat: function () {
        cats = []

        let cat1 = new cat({ name: "Mittens", age: 3, color: 'white', breed: 'Persian', weight: 10, description: 'Mittens is a cute and cuddly cat with a playful personality.', ownerId: 1 })
        let cat2 = new cat({ name: "Fluffy", age: 4, color: 'black', breed: 'Bombay', weight: 8, description: 'Fluffy is a mischievous cat with a love for adventure.', ownerId: 10 })
        let cat3 = new cat({ name: "Patches", age: 2, color: 'brown', breed: 'Tabby', weight: 6, description: 'Patches is a friendly cat who loves attention and cuddles.', ownerId: 3 })
        let cat4 = new cat({ name: "Zoe", age: 1, color: 'white', breed: 'Khao Manee', weight: 3, description: 'Zoe is a curious cat who loves exploring her surroundings.', ownerId: 10 })
        let cat5 = new cat({ name: "Misty", age: 5, color: 'black', breed: 'Siamese', weight: 9, description: 'Misty is a graceful cat with a quiet and calm demeanor.', ownerId: 2 })
        let cat6 = new cat({ name: "Smokey", age: 2, color: 'brown', breed: 'Tabby', weight: 6, description: 'Smokey is a playful cat who loves chasing toys and cuddling.', ownerId: 9 })
        let cat7 = new cat({ name: "Tiger", age: 3, color: 'white', breed: 'Persian', weight: 10, description: 'Tiger is a majestic cat with a regal presence and a friendly demeanor.', ownerId: 1 })
        let cat8 = new cat({ name: "Shadow", age: 4, color: 'black', breed: 'Bombay', weight: 8, description: 'Shadow is a mysterious cat with a quiet and watchful nature.', ownerId: 4 })
        let cat9 = new cat({ name: "Oreo", age: 2, color: 'brown', breed: 'Tabby', weight: 6, description: 'Oreo is a sweet cat who loves snuggles and treats.', ownerId: 4 })
        let cat10 = new cat({ name: "Socks", age: 1, color: 'white', breed: 'Khao Manee', weight: 3, description: 'Socks is a playful and energetic cat who loves to play and explore.', ownerId: 8 })
        let cat11 = new cat({ name: "Snowball", age: 5, color: 'black', breed: 'Siamese', weight: 9, description: 'Snowball is a curious and adventurous cat who loves to explore and discover new things.', ownerId: 5 })
        let cat12 = new cat({ name: "Salem", age: 2, color: 'brown', breed: 'Tabby', weight: 6, description: 'Salem is a mischievous and playful cat who loves to get into trouble and have fun.', ownerId: 6 })
        let cat13 = new cat({ name: "Sylvester", age: 3, color: 'white', breed: 'Persian', weight: 10, description: 'Sylvester is a lovable and cuddly cat who loves to cuddle and be petted.', ownerId: 7 })
        let cat14 = new cat({ name: "Garfield", age: 4, color: 'black', breed: 'Bombay', weight: 8, description: 'Garfield is a lazy and sleepy cat who loves to sleep and eat.', ownerId: 9 })
        let cat15 = new cat({ name: "Tom", age: 2, color: 'brown', breed: 'Tabby', weight: 6, description: 'Tom is a friendly cat who loves to play and cuddle with his human companions.', ownerId: 9 })
        let cat16 = new cat({ name: "Pixie", age: 2, color: 'black', breed: 'common', weight: 4, description: 'Pixie is a cute and playful cat who loves to run and play.', ownerId: 11 })
        let cat17 = new cat({ name: "Benga", age: 1, color: 'gray', breed: 'common', weight: 6, description: 'Benga is a sweet and friendly cat who loves to cuddle and be petted.', ownerId: 11 })

        cats.push(cat1)
        cats.push(cat2)
        cats.push(cat3)
        cats.push(cat4)
        cats.push(cat5)
        cats.push(cat6)
        cats.push(cat7)
        cats.push(cat8)
        cats.push(cat9)
        cats.push(cat10)
        cats.push(cat11)
        cats.push(cat12)
        cats.push(cat13)
        cats.push(cat14)
        cats.push(cat15)
        cats.push(cat16)
        cats.push(cat17)

        cats.forEach((c) => {
            db.addCat(c.dataValues)
        })
    },

    getCat: async function () {
        try {
            return await db.getCats()
        } catch (err) {
            console.log(err)
        }
    },

    getOneCat: async function (id) {
        return await db.getOneCatById(id)
    },

    createCat: async function (name, age, color, breed, weight, description, ownerId) {
        let newCat = new cat({ name: name, age: age, color: color, breed: breed, weight: weight, description: description, ownerId: ownerId })
        return await db.addCat(newCat.dataValues)
    },

    deleteCat: async function (id) {
        return await db.deleteCat(id)
    },

    updateCat: async function (id, name, age, color, breed, weight, description, ownerId) {
        let index = cats.filter(el => el.id == id)

        cats[index] = {
            id: parseInt(id),
            name: name,
            age: age,
            color: color,
            breed: breed,
            weight: weight,
            description: description,
            ownerId: ownerId
        }

        return await db.updateCat(cats[index])
    },

    filterCatByWeight: async function (weight) {
        return await db.filterCatsByWeight(weight)
    },

    getStatisticReport: async function () {
        return await db.getStatisticReport()
    },

    getStatisticReportBreed: async function (breed) {
        return await db.getStatisticReportBreed(breed)
    }
}