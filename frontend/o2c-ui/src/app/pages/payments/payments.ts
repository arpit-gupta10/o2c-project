import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payments.html',
  styleUrls: ['./payments.css']
})
export class PaymentsComponent {

  orderId = '';           // User input for order to pay
  successMessage = '';
  errorMessage = '';

  constructor(private api: ApiService, private router: Router) {}

  payOrder() {
    if (!this.orderId) {
      this.errorMessage = 'Please enter Order ID!';
      return;
    }

    this.api.pay(this.orderId).subscribe({
      next: (res) => {
        this.successMessage = `Payment successful! Payment ID: ${res.paymentId}`;
        this.errorMessage = '';
        this.orderId = '';
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Payment failed!';
        this.successMessage = '';
      }
    });
  }
}
