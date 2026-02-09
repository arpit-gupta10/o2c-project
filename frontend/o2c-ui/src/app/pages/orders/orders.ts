import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.services';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css'],
})
export class OrdersComponent implements OnInit {

  orders$!: Observable<any[]>; // ⚡ definite assignment

  constructor(private api: ApiService) {}

  ngOnInit() {
    // API call here after api is initialized
    this.orders$ = this.api.getOrders().pipe(
      tap(data => console.log("Orders API Data:", data))
    );
  }
}
