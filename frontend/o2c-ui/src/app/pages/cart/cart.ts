import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent {

  cartItems: string[] = ["SKU1","SKU2"]; // Ye array me product SKUs rakh sakte ho

  constructor(private router: Router, private api: ApiService) {}

  // Remove item from cart
  removeItem(item: string) {
    this.cartItems = this.cartItems.filter(i => i !== item);
  }

  // Go to checkout
  checkout() {
    if (this.cartItems.length === 0) {
      alert('Cart is empty!');
      return;
    }

    // Optionally: send to backend to create order
    this.api.placeOrder(this.cartItems).subscribe({
      next: (res: any) => {
        alert(`Order placed successfully! Order ID: ${res.orderId}`);
        this.cartItems = [];
        this.router.navigate(['/checkout'], { state: { orderId: res.orderId } });
      },
      error: (err) => {
        console.error(err);
        alert('Order placement failed!');
      }
    });
  }

}
