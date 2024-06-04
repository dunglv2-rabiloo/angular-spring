import { Routes } from '@angular/router';
import { SigninComponent } from './modules/signin/signin.component';
import { LayoutComponent } from './modules/layout/layout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ExpensesComponent } from './modules/expenses/expenses.component';
import { NewExpenseComponent } from './modules/expenses/new-expense/new-expense.component';
import { EditExpenseComponent } from './modules/expenses/edit-expense/edit-expense.component';

export const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: '',
    component: LayoutComponent,
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
    ],
  },
];
