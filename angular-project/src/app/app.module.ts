import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './searchbar/searchbar.component';
import { SearchBarModule } from './searchbar/searchbar.module';



@NgModule({
  declarations: [AppComponent],
  exports: [AppComponent],
  imports: [
    CommonModule,
    IconModule,
    MatMenuModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    SearchBarModule
  ],
  providers: [IconSetService]
})
export class AppModule { }
