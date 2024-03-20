const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json'); // Importez votre configuration Sequelize
const sequelize = new Sequelize(config.development); // Créez une instance Sequelize avec la configuration appropriée
const Produit = require('./produit'); // Importez le modèle Produit

// Définir le modèle Panier
const Panier = sequelize.define('Panier', {
    // Définir les colonnes de la table Panier
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false // Le user_id ne peut pas être nul
        // Ajoutez d'autres contraintes si nécessaire
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false // Le product_id ne peut pas être nul
        // Ajoutez d'autres contraintes si nécessaire
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false, // La quantité ne peut pas être nulle
        defaultValue: 1 // Valeur par défaut de la quantité
        // Ajoutez d'autres contraintes si nécessaire
    }
});

// Définir la relation entre Panier et Produit
Panier.belongsTo(Produit, { foreignKey: 'product_id' });

module.exports = Panier;
