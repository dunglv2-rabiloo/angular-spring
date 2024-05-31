import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerChevronLeft } from '@ng-icons/tabler-icons';
import { Category, CategoryService } from '../../categories/categories.service';
import { ExpenseService } from '../expenses.service';

@Component({
  selector: 'app-new-expense',
  standalone: true,
  imports: [RouterLink, NgIconComponent, ReactiveFormsModule],
  templateUrl: './new-expense.component.html',
  styleUrl: './new-expense.component.css',
  viewProviders: [provideIcons({ tablerChevronLeft })],
})
export class NewExpenseComponent {
  expenseForm = new FormGroup({
    subject: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl(),
  });
  categories: Category[] = [];

  constructor(
    private cateService: CategoryService,
    private expenseService: ExpenseService
  ) {
    this.fetchCategories();
  }

  async fetchCategories() {
    this.categories = await this.cateService.getAllCategories();
    this.expenseForm.controls.category.setValue(this.categories[0].code);
  }

  handleSubmit() {
    if (this.expenseForm.invalid) {
      throw new Error('Invalid form data');
    }

    const { subject, amount, date, category, description } =
      this.expenseForm.value;

    this.expenseService.addExpense({
      subject: subject || '',
      amount: Number(amount),
      date: new Date(date || ''),
      category: category || '',
      description: description,
    });
  }
}
