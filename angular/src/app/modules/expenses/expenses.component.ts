import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerPlus, tablerFilter } from '@ng-icons/tabler-icons';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { Expense, ExpenseService } from './expenses.service';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    RouterLink,
    NgIconComponent,
    DatePipe,
    PaginationComponent,
    CurrencyPipe,
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
  viewProviders: [provideIcons({ tablerPlus, tablerFilter })],
})
export class ExpensesComponent {
  totalPages: number = 10;
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) {}

  async fetchExpenses(page: number) {
    const pageRes = await this.expenseService.getAllExpenses(page);
    this.totalPages = pageRes.totalPages;
    this.expenses = pageRes.items;
  }
}
