import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./reset/reset.module').then( m => m.ResetPageModule)
  },
  {
    path: 'driver',
    loadChildren: () => import('./driver/driver.module').then( m => m.DriverPageModule)
  },
  {
    path: 'pharmacy',
    loadChildren: () => import('./pharmacy/pharmacy.module').then( m => m.PharmacyPageModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then( m => m.CustomerPageModule)
  },
  {
    path: 'dispatcher',
    loadChildren: () => import('./dispatcher/dispatcher.module').then( m => m.DispatcherPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'user-role',
    loadChildren: () => import('./user-role/user-role.module').then( m => m.UserRolePageModule)
  },  {
    path: 'card-payment',
    loadChildren: () => import('./card-payment/card-payment.module').then( m => m.CardPaymentPageModule)
  },
  {
    path: 'order-history',
    loadChildren: () => import('./order-history/order-history.module').then( m => m.OrderHistoryPageModule)
  },
  {
    path: 'faqs',
    loadChildren: () => import('./faqs/faqs.module').then( m => m.FaqsPageModule)
  },
  {
    path: 'terms-andconditions',
    loadChildren: () => import('./terms-andconditions/terms-andconditions.module').then( m => m.TermsAndconditionsPageModule)
  },
  {
    path: 'home-second',
    loadChildren: () => import('./home-second/home-second.module').then( m => m.HomeSecondPageModule)
  },
  {
    path: 'become-a-driver',
    loadChildren: () => import('./become-a-driver/become-a-driver.module').then( m => m.BecomeADriverPageModule)
  },
  {
    path: 'about-med-dash',
    loadChildren: () => import('./about-med-dash/about-med-dash.module').then( m => m.AboutMedDashPageModule)
  },
  {
    path: 'covid-19',
    loadChildren: () => import('./covid-19/covid-19.module').then( m => m.Covid19PageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },

<<<<<<< HEAD
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
=======
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./reset/reset.module').then( m => m.ResetPageModule)
  },
  {
    path: 'driver',
    loadChildren: () => import('./driver/driver.module').then( m => m.DriverPageModule)
  },
  {
    path: 'pharmacy',
    loadChildren: () => import('./pharmacy/pharmacy.module').then( m => m.PharmacyPageModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then( m => m.CustomerPageModule)
  },
  {
    path: 'dispatcher',
    loadChildren: () => import('./dispatcher/dispatcher.module').then( m => m.DispatcherPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'user-role',
    loadChildren: () => import('./user-role/user-role.module').then( m => m.UserRolePageModule)
  },
  {
    path: 'meds',
    loadChildren: () => import('./meds/meds.module').then(m => m.MedsPageModule)
  },
  {
    path: 'prescription-modal',
    loadChildren: () => import('./prescription-modal/prescription-modal.module').then(m => m.PrescriptionModalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
>>>>>>> d368fdee401208e0deaac7ea422dc5d30eaefcd3
