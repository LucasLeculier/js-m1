import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnInit {

  panier: any[] | undefined = undefined;
  totalCost: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPanier();
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
}
