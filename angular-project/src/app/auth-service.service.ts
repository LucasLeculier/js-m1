import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  async handleRegister(username: string, password: string, confPassword: string): Promise<void> {
    try {
      if (username === '' || password === '') {
        throw new Error('identifiants ou mot de passe vide');
      }
      if (password !== confPassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }
      const response = await this.http.post<any>('http://localhost:3000/api/register', {
        username: username,
        password: password
      }).toPromise();
      console.log('Inscription réussie:', response);
      // Redirigez l'utilisateur vers une autre page après l'inscription réussie
      this.router.navigate(['/'], { queryParams: { username: username } });
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    }
  }

  async handleLogin(username: string, password: string): Promise<void> {
    try {
      if (username === '' || password === '') {
        throw new Error('identifiants ou mot de passe vide');
      }
      const response = await this.http.post<any>('http://localhost:3000/api/login', {
        username: username,
        password: password
      }).toPromise();
      const token = response.token;
      const id = response.id;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);
      console.log('Connexion réussie:', response);
      // Redirigez l'utilisateur vers une autre page après l'inscription réussie
      this.router.navigate(['/'], { queryParams: { username: username } });
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    }
  }
}
