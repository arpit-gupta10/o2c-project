// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';

// // Pages / Components
// import { LoginComponent } from './pages/login/login';
// import { CatalogComponent } from './pages/catalog/catalog';
// import { CartComponent } from './pages/cart/cart';
// import { CheckoutComponent } from './pages/checkout/checkout';
// import { PaymentsComponent } from './pages/payments/payments';
// import { OrdersComponent } from './pages/orders/orders';

// // Admin components
// import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
// import { AdminOrdersComponent } from './pages/admin/admin-orders/admin-orders.component';
// import { AdminPaymentsComponent } from './pages/admin/admin-payments/admin-payments.component';
// import { AdminShipmentsComponent } from './pages/admin/admin-shipments/admin-shipments.component';

// // Services
// import { ApiService } from './services/api.services';
// import { AuthService } from './auth/auth.service';

// // Guards
// import { AuthGuard } from './guards/auth.guard';
// import { adminGuard } from './guards/role.guard';

// // Interceptors
// import { authInterceptor } from './core/interceptors/auth.interceptor';
// import { correlationInterceptor } from './core/interceptors/correlation.interceptor';

// // App config
// import { APP_CONFIG, APP_CONFIG_VALUE } from './app.config';

// @NgModule({
//   declarations: [
//     AppComponent,
//     LoginComponent,
//     CatalogComponent,
//     CartComponent,
//     CheckoutComponent,
//     PaymentsComponent,
//     OrdersComponent,
//     AdminDashboardComponent,
//     AdminOrdersComponent,
//     AdminPaymentsComponent,
//     AdminShipmentsComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     FormsModule,
//     ReactiveFormsModule,
//     HttpClientModule
//   ],
//   providers: [
//     ApiService,
//     AuthService,
//     AuthGuard,
//     adminGuard,
//     { provide: HTTP_INTERCEPTORS, useClass: authInterceptor, multi: true },
//     { provide: HTTP_INTERCEPTORS, useClass: correlationInterceptor, multi: true },
//     { provide: APP_CONFIG, useValue: APP_CONFIG_VALUE }
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
