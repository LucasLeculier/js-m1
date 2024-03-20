// produit.js

const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json'); // Importez votre configuration Sequelize

// Créez une instance Sequelize avec la configuration appropriée
const sequelize = new Sequelize(config.development);

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categorie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prix: {
        type: DataTypes.FLOAT,
        allowNull: false
    }

});

module.exports = Product;
