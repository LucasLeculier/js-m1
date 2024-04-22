import { Component, OnInit, Input, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { cilCart } from '@coreui/icons';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { SearchBarComponent } from './searchbar/searchbar.component';
import { SearchBarModule } from './searchbar/searchbar.module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterLink, RouterOutlet, MatMenuModule, MatButtonModule, SearchBarModule],
  styleUrls: ['./app.component.css'],
  standalone: true
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;
  username: string | null = null;
  searchTerm: string = '';
  anchorElLog: any = null;
  anchorElPanier: any = null;

  constructor(private route: ActivatedRoute, private router: Router, public iconSet: IconSetService) {iconSet.icons = { cilCart }; }

  ngOnInit(): void {
    console.log(this.route.snapshot)
    this.username = this.route.snapshot.queryParams['username'];
    console.log(this.username)
    if (this.username !== null && this.username !== undefined) {
      this.isAuthenticated = true;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    this.username = null;
    this.isAuthenticated = false;
    this.router.navigate(['/'], { queryParams: { username: null } });
  }

  handleClickLog(event: any): void {
    this.anchorElLog = this.anchorElLog ? null : event.currentTarget;
  }

  handleCloseLog(): void {
    this.anchorElLog = null;
  }

  onSearchQueryChange(event: Event): void {
    // Ajoutez ici le code pour traiter l'événement, par exemple :
    const searchQuery = (event.target as HTMLInputElement).value;
    console.log('Nouvelle recherche : ', searchQuery);
  }

  handleClickPanier(event: any): void {
    this.anchorElPanier = this.anchorElPanier ? null : event.currentTarget;
  }

  handleClosePanier(): void {
    this.anchorElPanier = null;
  }

  setUsername(username: string): void {
    this.username = username;
  }

}
