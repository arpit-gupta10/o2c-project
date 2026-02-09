import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  message = '';
  error = '';

  constructor(private api: ApiService, private router: Router) {}

  register() {
    this.message = '';
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Please fill all fields';
      return;
    }

    this.api.register(this.email, this.password).subscribe({
      next: () => {
        this.message = 'Registration Successful ✅';
        this.email = '';
        this.password = '';

        // Redirect to login page after 1-2 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: () => {
        this.error = 'Registration Failed ❌';
      }
    });
  }
}
