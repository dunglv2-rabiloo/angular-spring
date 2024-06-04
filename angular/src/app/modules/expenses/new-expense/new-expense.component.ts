import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerChevronLeft } from '@ng-icons/tabler-icons';
import { Expense, ExpenseService } from '../expenses.service';
import { ExpenseFormComponent } from '../../../shared/expense-form/expense-form.component';

@Component({
  selector: 'app-new-expense',
  standalone: true,
  imports: [
    RouterLink,
    NgIconComponent,
    ReactiveFormsModule,
    ExpenseFormComponent,
  ],
  templateUrl: './new-expense.component.html',
  styleUrl: './new-expense.component.css',
  viewProviders: [provideIcons({ tablerChevronLeft })],
})
export class NewExpenseComponent {
  constructor(private expenseService: ExpenseService, private router: Router) {}

  async addExpense(expense: Expense) {
    await this.expenseService.addExpense(expense);
    this.router.navigate(['/expenses']);
  }
}
