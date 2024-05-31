import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface NewExpense {
  subject: string;
  amount: number;
  date: Date;
  description?: string | null;
  category: string;
}

export interface Page<T> {
  totalPages: number;
  items: T[];
}

export interface Expense {
  id: number;
  subject: string;
  amount: number;
  date: Date;
  category: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  async addExpense(newExpense: NewExpense) {
    await firstValueFrom(this.http.post('/api/me/expenses', newExpense));
  }

  async getAllExpenses(page: number): Promise<Page<Expense>> {
    return await firstValueFrom(
      this.http.get<Page<Expense>>('/api/me/expenses', {
        params: {
          page: page - 1,
        },
      })
    );
  }
}