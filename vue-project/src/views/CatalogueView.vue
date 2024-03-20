<template>
  <div style="position: absolute;
  top:70px;
  left:0px;
  width:100%">
    <h1>Catalogue des produits</h1>
    <table id="productTable" class="display">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Catégorie</th>
          <th>Prix</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.nom }}</td>
          <td>{{ product.categorie }}</td>
          <td>{{ product.prix }}</td>
          <td><button @click="addToPanier(product.id)">Ajouter au Panier</button></td>
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
  name: 'CatalogueView',
  data() {
    return {
      products: []
    };
  },
  async mounted() {
    try {
      const response = await axios.post('http://localhost:3000/api/products');
      this.products = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    }
    $(document).ready(() => {
      $('#productTable').DataTable();
    });
  },
  methods: {
    async addToPanier(productId) {
  try {
    // Récupérer l'ID de l'utilisateur depuis le stockage local
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('ID utilisateur non trouvé dans le stockage local');
      return;
    }

    // Envoyer les données nécessaires au back-end
    await axios.post('http://localhost:3000/api/Addpanier', { user_id: userId, product_id: productId });
    alert('Produit ajouté au panier avec succès');
    window.location.reload();
  } catch (error) {
    console.error('Erreur lors de l\'ajout du produit au panier:', error);
  }
}

  }

};
</script>
