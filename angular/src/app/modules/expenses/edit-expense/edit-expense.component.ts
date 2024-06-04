import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseFormComponent } from '../../../shared/expense-form/expense-form.component';
import { Expense, ExpenseService, PersistedExpense } from '../expenses.service';

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [ExpenseFormComponent],
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.css',
})
export class EditExpenseComponent {
  expense: PersistedExpense | undefined = undefined;

  constructor(
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.fetchExpense();
  }

  async fetchExpense() {
    const expenseId = Number(this.route.snapshot.paramMap.get('id'));
    this.expense = await this.expenseService.getExpense(expenseId);
  }

  async saveExpense(expense: Expense) {
    await this.expenseService.updateExpense(expense);
    this.router.navigate(['/expenses']);
  }
}
