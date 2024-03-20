import axios from 'axios';

export default {
  async fetchDataFromServer() {
    try {
      const response = await axios.get('https://votre-api.com/donnees'); // Remplacez l'URL par l'URL de votre API back-end
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      throw error;
    }
  }
};
