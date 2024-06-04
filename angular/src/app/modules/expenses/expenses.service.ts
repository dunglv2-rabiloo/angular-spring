import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface Page<T> {
  totalPages: number;
  items: T[];
}

export interface Expense {
  id?: number;
  subject: string;
  amount: number;
  date: Date;
  category: string;
  description?: string;
}

export interface PersistedExpense extends Expense {
  id: number;
}

export interface ExpenseFilter {
  keyword?: string;
  from?: string;
  to?: string;
  categories?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  async addExpense(newExpense: Expense) {
    await firstValueFrom(this.http.post('/api/me/expenses', newExpense));
  }

  async updateExpense(expense: Expense) {
    console.log(expense);
    await firstValueFrom(
      this.http.put(`/api/me/expenses/${expense.id}`, expense)
    );
  }

  async getAllExpenses(
    page: number,
    filter: ExpenseFilter
  ): Promise<Page<PersistedExpense>> {
    return await firstValueFrom(
      this.http.get<Page<PersistedExpense>>('/api/me/expenses', {
        params: {
          page: page - 1,
          ...filter,
        },
      })
    );
  }

  async getExpense(id: number) {
    return await firstValueFrom(
      this.http.get<PersistedExpense>(`/api/me/expenses/${id}`)
    );
  }

  async deleteExpense(id: number) {
    return await firstValueFrom(this.http.delete(`/api/me/expenses/${id}`));
  }
}
