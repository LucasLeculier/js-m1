export default function isAuthenticated() {
    const token = localStorage.getItem('token');
    // Vérifiez si le token est présent et s'il est valide (par exemple, vérifiez s'il est expiré)
    return !!token; // Renvoie true si le token est présent, false sinon
  }
  