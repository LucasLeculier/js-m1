<template>
    <div style="position: absolute;
    left:0px;
    top:70px;
    width:100%">
      <h1>Mon panier</h1>
      <h2>Prix total : {{ getTotalPrice() }}</h2>
      <table id="productTable" class="display">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Quantité</th>
            <th>Prix</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.product_id }}</td>
            <td>{{ product.Product.nom }}</td>
            <td>{{ product.Product.categorie }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.Product.prix * product.quantity }}</td>
            <td><button @click="subToPanier(product.id)">Supprimer Panier</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>

  
  <script>
  import axios from 'axios';
  import $ from 'jquery';
  import 'datatables.net';
  import 'datatables.net-dt/css/dataTables.dataTables.css';
  
  export default {
    name: 'Panier',
    data() {
      return {
        products: []
      };
    },
    async mounted() {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.post('http://localhost:3000/api/panierUser', { user_id: userId });
        this.products = response.data;
        console.log('Produits récupérés:', this.products)
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
      $(document).ready(() => {
  $('#productTable').DataTable({
    lengthChange: false, // Désactiver le choix du nombre d'éléments par page
    paging: false, // Désactiver la pagination
    pageLength: -1 // Afficher le nombre maximal d'éléments par défaut
  });
});

    },
    methods: {
      getTotalPrice() {
      // Initialiser la somme à 0
      let totalPrice = 0;
      // Parcourir chaque produit dans la liste
      this.products.forEach(product => {
        // Ajouter le prix du produit multiplié par la quantité à la somme totale
        totalPrice += product.Product.prix * product.quantity;
      });
      // Retourner la somme totale formatée
      return totalPrice.toFixed(2); // Formatage du nombre pour afficher deux décimales
    },
      async subToPanier(productId) {
    try {
      // Récupérer l'ID de l'utilisateur depuis le stockage local
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('ID utilisateur non trouvé dans le stockage local');
        return;
      }
  
      // Envoyer les données nécessaires au back-end
      await axios.post('http://localhost:3000/api/subPanier', { user_id: userId, id: productId });
      alert('Produit supprimé du panier avec succès');
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la suppression du produit au panier:', error);
    }
  }
  
    }
  
  };
  </script>
  