import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CatalogueView from '../views/CatalogueView.vue';
import AboutView from '../views/AboutView.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import isAuthenticated from '../middleware/isAuthenticated';
import Logout from '../views/Logout.vue';
import Panier from '../views/Panier.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: CatalogueView,
      //meta: {
        //requiresAuth: true // Ajoutez cette propriété pour spécifier que cette route nécessite une authentification
      //}
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/panier',
      name: 'Panier',
      component: Panier
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router;
