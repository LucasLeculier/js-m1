import { Component, Output, EventEmitter } from '@angular/core';
import { SearchBarService } from '../searchbar.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchBarComponent {
  searchQuery: string = '';

  constructor(private searchBarService: SearchBarService) {}

  onSearchIconClick(): void {
    // Logique à exécuter lorsque l'icône de recherche est cliquée
    console.log(this.searchQuery)
    this.searchBarService.updateFilteredData(this.searchQuery);
  }
}
