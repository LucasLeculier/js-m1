<template>
    <div>
      <h2>Inscription</h2>
      <form @submit.prevent="register" class="form">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" placeholder="Email" required>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe:</label>
          <input type="password" v-model="password" placeholder="Mot de passe" required>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirmer le mot de passe:</label>
          <input type="password" v-model="confirmPassword" placeholder="Confirmer le mot de passe" required>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: ''
      };
    },
    methods: {
      async register() {
        try {
          if (this.password !== this.confirmPassword) {
            throw new Error('Les mots de passe ne correspondent pas');
          }
          const response = await axios.post('http://localhost:3000/api/register', {
            username: this.email,
            password: this.password
          });
          console.log('Inscription réussie:', response.data);
          // Redirigez l'utilisateur vers une autre page après l'inscription réussie
        } catch (error) {
          console.error('Erreur lors de l\'inscription:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
    .form {
      max-width: 400px;
      margin: 0 auto;
    }
  
    .form-group {
      margin-bottom: 1rem;
    }
  
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
  
    input[type="email"],
    input[type="password"] {
      width: 100%;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    button {
      display: inline-block;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    button:hover {
      background-color: #0056b3;
    }
  </style>
  