import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerFilter, tablerPlus, tablerTrash } from '@ng-icons/tabler-icons';
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
    CommonModule,
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
  viewProviders: [provideIcons({ tablerPlus, tablerFilter, tablerTrash })],
})
export class ExpensesComponent {
  totalPages: number = 10;
  expenses: Expense[] = [];

  constructor(
    private expenseService: ExpenseService,
    private router: ActivatedRoute
  ) {}

  async fetchExpenses(page: number) {
    const pageRes = await this.expenseService.getAllExpenses(page);
    this.totalPages = pageRes.totalPages;
    this.expenses = pageRes.items;

    console.log(this.expenses);
  }

  async deleteExpense(id: number) {
    await this.expenseService.deleteExpense(id);
    await this.fetchExpenses(
      Number(this.router.snapshot.paramMap.get('page')) || 1
    );
  }
}
