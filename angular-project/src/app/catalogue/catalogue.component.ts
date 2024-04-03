import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NavbarComponent, CommonModule, HttpClientModule],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css',
})

export class CatalogueComponent implements OnInit {
  username: string | null = null;
  products: any[] = [];
  panier: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private app: AppComponent) { }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        
          this.username = params['username'];
          if(this.username !== null){
            this.app.setUsername(this.username);
          }
      });
      this.app.ngOnInit();
      console.log(this.username)
      this.fetchProducts();
  }

  fetchProducts(): void {
    
      this.http.post<any[]>('http://localhost:3000/api/products', {}).subscribe(
          (response) => {
              this.products = response;
          },
          (error) => {
              console.error('Erreur lors de la récupération des produits:', error);
          }
      );
  }

  addToCart(product: any): void {
      const userId = localStorage.getItem('userId');
      if (!userId) {
          console.error('ID utilisateur non trouvé dans le stockage local');
          return;
      }
      this.http.post('http://localhost:3000/api/Addpanier', { user_id: userId, product_id: product.id }).subscribe(
          () => {
              alert('Produit ajouté au panier avec succès');
              this.panier.push(product);
          },
          (error) => {
              console.error('Erreur lors de l\'ajout du produit au panier:', error);
          }
      );
  }

}
