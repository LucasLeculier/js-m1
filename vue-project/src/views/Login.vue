<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <input type="email" v-model="email" placeholder="Email" class="form-control">
      </div>
      <div class="form-group">
        <input type="password" v-model="password" placeholder="Mot de passe" class="form-control">
      </div>
      <button type="submit" class="btn btn-primary">Se connecter</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          username: this.email,
          password: this.password
        });
        const token = response.data.token;
        const id = response.data.id;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', id);
        console.log('Connexion réussie:', response.data);
        // Redirection en utilisant la route qui a pour nom catalogue
        this.$router.push({ name: 'catalogue' }).then(() => {
          // Rafraîchir la page après la redirection
          window.location.reload();
        });
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
}

.login-form {
  padding: 20px;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
