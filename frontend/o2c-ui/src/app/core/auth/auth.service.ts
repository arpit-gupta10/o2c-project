import { Injectable, signal } from '@angular/core';
import { ApiService } from '../../services/api.services';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user = signal<any>(null);

  constructor(private api: ApiService) {}

  login(email: string, password: string) {
    return this.api.login(email, password).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        this.user.set(res);
      })
    );
  }

  loadMe() {
    return this.api.getMe().pipe(
      tap(res => this.user.set(res))
    );
  }

  logout() {
    localStorage.clear();
    this.user.set(null);
    location.href = '/login';
  }
}
