import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.services';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent {

  cartItems: string[] = []; // SKU list
  successMessage = '';
  errorMessage = '';

  constructor(private api: ApiService, private router: Router) {
    // Example: dummy cart for demo
    this.cartItems = ['SKU1', 'SKU2']; 
  }

  placeOrder() {
    if (this.cartItems.length === 0) {
      this.errorMessage = "Cart is empty!";
      return;
    }

    this.api.placeOrder(this.cartItems).subscribe({
      next: (res) => {
        this.successMessage = `Order placed! Order ID: ${res.orderId}`;
        this.cartItems = []; // Clear cart after order
        setTimeout(() => this.router.navigate(['/orders']), 1500); // redirect to orders page
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = "Failed to place order!";
      }
    });
  }
}
