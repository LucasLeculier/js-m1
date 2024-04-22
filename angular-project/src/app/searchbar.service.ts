// search-bar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  private filteredDataSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filteredData$: Observable<string> = this.filteredDataSubject.asObservable();

  updateFilteredData(searchQuery: string): void {
    this.filteredDataSubject.next(searchQuery);
  }
}
