const User = require('../user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    try {
        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 est le nombre de salage

        // Créer l'utilisateur avec le mot de passe haché
        const user = await User.create({
            username: req.body.username,
            password: hashedPassword
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Recherche de l'utilisateur dans la base de données par son nom d'utilisateur
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérification du mot de passe
        console.log(password, user.password)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Création du token JWT
        const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });

        // Authentification réussie, renvoyer l'ID de l'utilisateur avec le token
        res.status(200).json({ message: 'Connexion réussie', token, id: user.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await User.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedUser = await User.findByPk(id);
            return res.status(200).json(updatedUser);
        }
        throw new Error("User not found");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await User.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send("User deleted");
        }
        throw new Error("User not found");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
