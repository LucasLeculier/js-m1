<template>
  <header>
    <!-- Autres éléments de votre en-tête -->
    <RouterLink to="/logout">Déconnexion</RouterLink>
  </header>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  mounted() {
    this.logout(); // Appel de la fonction logout lorsque le composant est monté
  },
  methods: {
    logout() {
      // Effacer le token JWT du localStorage
      localStorage.removeItem('token');
      
      // Rediriger l'utilisateur vers la page de connexion ou toute autre page appropriée
      const router = useRouter();
      router.push('/login').then(() => {
        // Rafraîchir la page après la redirection
        window.location.reload();
      });
    }
  }
};
</script>
