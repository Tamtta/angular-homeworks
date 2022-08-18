import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthUserGuard } from './core/guards/auth-user.guard';
import { CurrencyGuard } from './core/guards/currency.guard';
import { LoginGuard } from './core/guards/login.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/register/register.module').then(
        (m) => m.RegisterModule
      ),
    canActivate: [AuthUserGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
    canActivate: [AuthUserGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.module').then((m) => m.UsersModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('./features/employees/employees.module').then(
        (m) => m.EmployeesModule
      ),
  },
  {
    path: 'currency',
    loadChildren: () =>
      import('./features/currency/currency.module').then(
        (m) => m.CurrencyModule
      ),
    canActivate: [LoginGuard, CurrencyGuard],
  },
  { path: 'logout', redirectTo: 'login', pathMatch: 'full' },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
