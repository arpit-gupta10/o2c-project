import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
  if (localStorage.getItem('role') === 'Admin') return true;
  inject(Router).navigate(['/access-denied']);
  return false;
};
