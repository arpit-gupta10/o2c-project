import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.services';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor, NgIf],
  templateUrl: './catalog.html'
})
export class CatalogComponent {
  products$: Observable<any[]>;

  constructor(private api: ApiService) {
    // Observable me store kar rahe hain
    this.products$ = this.api.getCatalog().pipe(
      tap(data => console.log("API DATA:", data)) // check console
    );
  }
}
