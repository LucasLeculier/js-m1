const express = require('express');
const userController = require('./models/controllers/userController');
const productController = require('./models/controllers/productController');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const panierController = require('./models/controllers/panierController');
app.use(express.json());
app.use(cors());

// Route pour créer un utilisateur
app.post('/api/register', userController.createUser);
app.post('/api/login', userController.loginUser);
app.post('/api/products', productController.getAllProducts);
app.post('/api/Addpanier', panierController.addToPanier);
app.post('/api/totalPanier', panierController.countItemsInPanier);
app.post('/api/panierUser', panierController.getPanierForUser);
app.post('/api/subPanier', panierController.subPanier);

// Définissez d'autres routes pour d'autres actions CRUD


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
