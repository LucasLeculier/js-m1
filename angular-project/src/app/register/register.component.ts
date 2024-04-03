import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-service.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, MatCardModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  username: string = '';
  password: string = '';
  confPassword: string = '';

  constructor(private authService: AuthService) {}

  registerUser(): void {
    this.authService.handleRegister(this.username, this.password, this.confPassword);
  }
}
