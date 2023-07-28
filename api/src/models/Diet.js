const {DataTypes, Sequelize} = require('sequelize');

module.exports = (Sequelize) =>{
    Sequelize.define('Diet',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        diets:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },{
        timestamps:false,
    })
}