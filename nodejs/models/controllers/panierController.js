const Panier = require('../panier');
const Produit = require('../produit');

exports.addToPanier = async (req, res) => {
    const { user_id, product_id } = req.body;
    
    try {
        // Vérifier si le produit existe déjà dans le panier de l'utilisateur
        let panierItem = await Panier.findOne({
            where: {
                user_id,
                product_id
            }
        });

        if (panierItem) {
            // Si le produit existe déjà dans le panier, augmenter la quantité de 1
            panierItem.quantity += 1;
            await panierItem.save();
        } else {
            // Si le produit n'existe pas dans le panier, le créer avec une quantité de 1
            panierItem = await Panier.create({
                user_id,
                product_id,
                quantity: 1
            });
        }

        res.status(201).json(panierItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getPanierForUser = async (req, res) => {
    const { user_id } = req.body;
    
    try {
        // Requête pour récupérer les produits du panier de l'utilisateur avec leurs informations
        const panierItems = await Panier.findAll({ 
            where: { user_id },
            include: [{ 
                model: Produit, // Nom du modèle de la table Produit
                attributes: ['nom', 'categorie', 'prix'], // Sélectionnez les attributs que vous voulez récupérer
                sourceKey: 'id', // Champ source dans la table Produit
                foreignKey: 'product_id' // Champ de liaison dans la table Panier
            }]
        });

        res.status(200).json(panierItems);
    } catch (error) {
        console.error('Error in getPanierForUser:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.subPanier = async (req, res) => {
    const { user_id, id } = req.body;
    console.log('user_id:', user_id);
    console.log('product_id:', id);

    try {
        // Trouver le produit dans le panier
        const panierItem = await Panier.findOne({
            where: { user_id, id }
        });

        if (!panierItem) {
            throw new Error("Product not found in panier");
        }

        // Si la quantité est de 1, supprimer le produit du panier
        if (panierItem.quantity === 1) {
            await Panier.destroy({
                where: { user_id, id }
            });
            return res.status(204).send("Product removed from panier");
        }

        // Sinon, décrémenter la quantité
        await Panier.update(
            { quantity: panierItem.quantity - 1 },
            { where: { user_id, id } }
        );

        res.status(200).send("Product quantity decremented in panier");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.countItemsInPanier = async (req, res) => {
    const { user_id } = req.body;
    try {
        if (!user_id) {
            return res.status(400).json({ error: 'Missing user_id in request body' });
        }

        const itemCount = await Panier.sum('quantity', {
            where: { user_id }
        });
        res.status(200).json({ itemCount });

    } catch (error) {
        console.error('Error in countItemsInPanier:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
