<template>
  <header class="header">
    <nav>
      <template v-if="isAuthenticated()">
        <router-link to="/">Home</router-link>
        <router-link to="/catalogue">Catalogue</router-link>
        <button @click="goToCart" class="cart-button">
          <img src="./components/icons/cart-icon.svg" alt="Cart icon" class="cart-icon" />
          <span class="cart-count">{{ totalProductsInCart }}</span>
        </button>
        <router-link to="/logout">Déconnexion</router-link>
      </template>
      
      <template v-else>
        <router-link to="/login">Connexion</router-link>
        <router-link to="/register">Inscription</router-link>
      </template>
    </nav>
  </header>
  
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import isAuthenticated from '@/middleware/isAuthenticated'

const router = useRouter();

// Utiliser ref pour déclarer totalProductsInCart
import { ref } from 'vue';
const totalProductsInCart = ref(0);

// Fonction asynchrone pour récupérer le nombre total de produits dans le panier
const fetchProductsInCart = async () => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('ID utilisateur non trouvé dans le stockage local');
      return;
    }
    const response = await axios.post('http://localhost:3000/api/totalPanier', { user_id: userId });
    totalProductsInCart.value = response.data.itemCount; // Utiliser .value pour accéder à la valeur de totalProductsInCart
  } catch (error) {
    console.error('Erreur lors de la récupération de la quantité:', error);
  }
};

// Appeler fetchProductsInCart après le montage du composant
onMounted(() => {
  fetchProductsInCart();
});

// Méthode pour rediriger l'utilisateur vers la vue du panier
const goToCart = () => {
  router.push({ name: 'Panier' });
};
</script>

<style scoped>
/* Styles CSS */
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #f8f9fa; /* Couleur de fond de la barre de navigation */
  height: 70px; /* Hauteur de la barre de navigation */
  width: 100%;
}

nav {
  display: flex;
  align-items: center;
}

nav a {
  margin-right: 20px; /* Espacement entre les liens */
  text-decoration: none;
  color: #000; /* Couleur des liens */
}

.cart-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-right: 20px; /* Espacement entre le bouton panier et les autres liens */
  position: relative;
}

.cart-icon {
  width: 24px; /* Taille de l'icône panier */
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 4px;
  font-size: 12px;
}
.router-view {
  width: 100%;
}

/* Pour s'assurer que le contenu à l'intérieur de chaque vue occupe également 100% de la largeur */
.router-view > div {
  width: 100%;
} 
</style>
