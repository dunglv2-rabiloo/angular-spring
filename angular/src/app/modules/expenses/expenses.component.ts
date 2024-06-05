import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerFilter,
  tablerPencil,
  tablerPlus,
  tablerTrash,
} from '@ng-icons/tabler-icons';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import {
  Expense,
  ExpenseFilter,
  ExpenseService,
  PersistedExpense,
} from './expenses.service';
import { Category, CategoryService } from '../categories/categories.service';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

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
    ReactiveFormsModule,
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
  viewProviders: [
    provideIcons({ tablerPlus, tablerFilter, tablerTrash, tablerPencil }),
  ],
})
export class ExpensesComponent implements OnInit {
  totalPages: number = 1;
  expenses: PersistedExpense[] = [];
  allCategories: Category[] = [];

  isFilterExpanded = false;
  filterForm = new FormGroup({
    keyword: new FormControl(),
    from: new FormControl(),
    to: new FormControl(),
    categories: new FormArray<FormControl>([]),
  });
  private filter: ExpenseFilter = {};

  constructor(
    private categoryService: CategoryService,
    private expenseService: ExpenseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  async deleteExpense(id: number) {
    await this.expenseService.deleteExpense(id);
    await this.fetchExpenses();
  }

  toggleFilter() {
    this.isFilterExpanded = !this.isFilterExpanded;
  }

  handleSelectPage(page: number) {
    this.fetchExpenses(page);
  }

  async initialize() {
    await this.fetchCategories();
    this.bindFilterQuery();
    this.doFilter();
  }

  async doFilter() {
    const formValues = this.filterForm.value;
    const criteria: ExpenseFilter = {
      ...formValues,
      categories: [],
    };

    this.filterForm.controls.categories.controls
      .map((c) => c.value)
      .forEach((checked, idx) => {
        if (!criteria.categories) criteria.categories = [];
        if (checked) criteria.categories?.push(this.allCategories[idx].code);
      });

    if (!criteria.keyword || !criteria.keyword.trim()) delete criteria.keyword;
    if (!criteria.from) delete criteria.from;
    if (!criteria.to) delete criteria.to;
    if (this.allCategories.length === criteria.categories?.length) {
      delete criteria.categories;
    }

    this.router.navigate([], {
      queryParams: { ...this.route.snapshot.queryParams, ...criteria },
    });
    this.filter = criteria;
    await this.fetchExpenses();
  }

  private bindFilterQuery() {
    const { keyword, from, to, categories }: ExpenseFilter =
      this.route.snapshot.queryParams;

    this.filterForm.patchValue({
      keyword: keyword,
      from: from,
      to: to,
    });

    this.filterForm.controls.categories.controls.forEach((control, idx) => {
      if (categories && !categories.includes(this.allCategories[idx].code)) {
        control.setValue(false);
      }
    });
  }

  private async fetchCategories() {
    this.allCategories = await this.categoryService.getAllCategories();
    this.allCategories.forEach((_) =>
      this.filterForm.controls.categories.controls.push(new FormControl(true))
    );
  }

  private async fetchExpenses(page?: number) {
    const pageRes = await this.expenseService.getAllExpenses(
      page || this.route.snapshot.queryParams['page'] || 1,
      this.filter
    );
    this.totalPages = pageRes.totalPages;
    this.expenses = pageRes.items;
  }
}
