const { Sequelize, Model, DataTypes } = require('sequelize')
// const cat = require('./cats_model')
// const foods_for_cats = require('./foods_for_cats_model')
const mysql2 = require('mysql2')

const sequelize = new Sequelize('bo8dhdnecmi9kqgy6joa', 'utjidt7rdyxmke4r', 'YRtSHxz0xzXW2m5UY4rT', {
    host: 'bo8dhdnecmi9kqgy6joa-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    dialectModule: mysql2,
    port: 3306
})

// const sequelize = new Sequelize('meow', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     dialectModule: mysql2,
//     port: 3307
// })

class foods extends Model { }

foods.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'foods',
    timestamps: false
})



module.exports = foods