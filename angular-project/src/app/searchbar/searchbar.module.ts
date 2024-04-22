// search-bar.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './searchbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [SearchBarComponent],
  imports: [CommonModule, MatFormFieldModule, FormsModule, MatIconModule, MatInputModule],
  exports: [SearchBarComponent]
})
export class SearchBarModule { }
