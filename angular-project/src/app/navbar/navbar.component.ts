import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule, RouterLink, RouterOutlet],
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  username: string | null = null;
  searchTerm: string = '';
  anchorElLog: any = null;
  anchorElPanier: any = null;
  panier: any[] | undefined = undefined;
  totalCost: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.username = username;
      this.isAuthenticated = true;
    }
    this.fetchPanier();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.username = null;
    this.isAuthenticated = false;
  }

  handleClickLog(event: any): void {
    this.anchorElLog = this.anchorElLog ? null : event.currentTarget;
  }

  handleCloseLog(): void {
    this.anchorElLog = null;
  }

  handleClickPanier(event: any): void {
    this.anchorElPanier = this.anchorElPanier ? null : event.currentTarget;
  }

  handleClosePanier(): void {
    this.anchorElPanier = null;
  }

  async fetchPanier(): Promise<void> {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('ID utilisateur non trouvé dans le stockage local');
        return;
      }
      const response = await this.http.post<any[]>('http://localhost:3000/api/panierUser', { user_id: userId }).toPromise();
      this.panier = response;
      console.log('Produits récupérés:', this.panier);
      this.getTotalPrice();
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    }
  }

  async deleteProduct(product: any): Promise<void> {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('ID utilisateur non trouvé dans le stockage local');
        return;
      }
      await this.http.post<any[]>('http://localhost:3000/api/subPanier', { user_id: userId, id: product.id }).toPromise();
      console.log('Produit supprimé du panier avec succès');
      await this.fetchPanier();
    } catch (error) {
      console.error('Erreur lors de la suppression du produit au panier:', error);
    }
  }

  getTotalPrice(): void {
    let totalPrice = 0;
    this.panier?.forEach(product => {
      totalPrice += product.Product.prix * product.quantity;
    });
    this.totalCost = Number(totalPrice.toFixed(2));
  }

  onSubmit(): void {
    // Logique de recherche ici
  }
}
