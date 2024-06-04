import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerChevronLeft } from '@ng-icons/tabler-icons';
import {
  Category,
  CategoryService,
} from '../../modules/categories/categories.service';
import {
  Expense,
  PersistedExpense,
} from '../../modules/expenses/expenses.service';
import moment from 'moment';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIconComponent, RouterModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css',
  viewProviders: [provideIcons({ tablerChevronLeft })],
})
export class ExpenseFormComponent implements OnChanges {
  @Input() expense: PersistedExpense | undefined = undefined;
  @Output() save = new EventEmitter<Expense>();

  expenseForm = new FormGroup({
    subject: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl(),
  });
  categories: Category[] = [];

  constructor(private cateService: CategoryService) {
    this.fetchCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expense']?.currentValue) {
      const expense = changes['expense'].currentValue as PersistedExpense;

      this.expenseForm.patchValue({
        subject: expense.subject,
        amount: expense.amount.toString(),
        date: moment(expense.date).format('YYYY-MM-DDTHH:mm'),
        description: expense.description,
        category: expense.category,
      });
      this.expenseForm.controls.category.setValue(expense.category);
    }
  }

  async fetchCategories() {
    this.categories = await this.cateService.getAllCategories();

    if (!this.expenseForm.controls.category.value) {
      this.expenseForm.controls.category.setValue(this.categories[0].code);
    }
  }

  async handleSubmit() {
    if (this.expenseForm.invalid) {
      throw new Error('Invalid form data');
    }

    const { subject, amount, date, category, description } =
      this.expenseForm.value;

    this.save.emit({
      id: this.expense?.id,
      subject: subject || '',
      amount: Number(amount),
      date: new Date(date || ''),
      category: category || '',
      description: description ?? undefined,
    });
  }
}
