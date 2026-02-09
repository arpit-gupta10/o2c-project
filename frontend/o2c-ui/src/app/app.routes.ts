import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { CatalogComponent } from './pages/catalog/catalog';
import { CartComponent } from './pages/cart/cart';
import { CheckoutComponent } from './pages/checkout/checkout';
import { PaymentsComponent } from './pages/payments/payments';
import { OrdersComponent } from './pages/orders/orders';

import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard';
import { AdminOrdersComponent } from './pages/admin/orders/orders';
import { AdminPaymentsComponent } from './pages/admin/payments/payments';
import { AdminShipmentsComponent } from './pages/admin/shipments/shipments';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },

  { path: 'catalog', component: CatalogComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },

  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard] },
  { path: 'admin/payments', component: AdminPaymentsComponent, canActivate: [AuthGuard] },
  { path: 'admin/shipments', component: AdminShipmentsComponent, canActivate: [AuthGuard] },

    {
    path: 'register',
    loadComponent: () =>
        import('./pages/register/register')
        .then(m => m.RegisterComponent)
    },


  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
