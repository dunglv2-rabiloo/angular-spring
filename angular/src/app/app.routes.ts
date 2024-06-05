import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { EditExpenseComponent } from './modules/expenses/edit-expense/edit-expense.component';
import { ExpensesComponent } from './modules/expenses/expenses.component';
import { NewExpenseComponent } from './modules/expenses/new-expense/new-expense.component';
import { LayoutComponent } from './modules/layout/layout.component';
import { SigninComponent } from './modules/signin/signin.component';
import { WalletsComponent } from './modules/wallets/wallets.component';
import {
  authenticatedGuard,
  unauthenticatedGuard,
} from './authenticated.guard';

export const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [unauthenticatedGuard],
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authenticatedGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'expenses',
        children: [
          {
            path: '',
            component: ExpensesComponent,
          },
          {
            path: 'new',
            component: NewExpenseComponent,
          },
          {
            path: ':id',
            component: EditExpenseComponent,
          },
        ],
      },
      {
        path: 'wallets',
        children: [
          {
            path: '',
            component: WalletsComponent,
          },
        ],
      },
    ],
  },
];
