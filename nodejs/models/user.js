const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json'); // Importez votre configuration Sequelize
const sequelize = new Sequelize(config.development); // Créez une instance Sequelize avec la configuration appropriée

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;
