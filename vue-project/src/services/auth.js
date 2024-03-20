// auth.js

import axios from 'axios';

// Fonction de connexion
export async function login(username, password) {
    try {
        const response = await axios.post('http://localhost:3000/api/login', {
            username,
            password
        });
        const token = response.data.token; // Supposons que le token est retourné dans la réponse
        localStorage.setItem('token', token); // Stocker le token dans le localStorage
        // Rediriger l'utilisateur vers une autre page ou mettre à jour l'état de l'application
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
    }
}

// Fonction de vérification de l'authentification
export function isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token; // Renvoie vrai si un token est présent dans le localStorage
}
