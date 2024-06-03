import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface ExpenseCategoryDistribution {
  code: string;
  label: string;
  totalAmount: number;
}

interface ExpenseDayTotals {
  date: string;
  totalAmount: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  async fetchCategoryDistributionReport(from: string, to: string) {
    return await firstValueFrom(
      this.http.get<ExpenseCategoryDistribution[]>(
        '/api/me/reports/expenses/distribution',
        {
          params: {
            from,
            to,
          },
        }
      )
    );
  }

  async fetchDayTotalsReport() {
    return await firstValueFrom(
      this.http.get<ExpenseDayTotals[]>('/api/me/reports/expenses/day_totals')
    );
  }
}
