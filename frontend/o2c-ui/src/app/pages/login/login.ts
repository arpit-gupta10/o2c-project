import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {
    this.api.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);

        if(res.role === 'Admin')
          this.router.navigate(['/admin']);
        else
          this.router.navigate(['/catalog']);
      },
      error: () => {
        this.error = 'Invalid credentials';
      }
    });
  }
}
