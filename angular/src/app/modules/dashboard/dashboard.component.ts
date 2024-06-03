import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  from = new Date().toISOString().slice(0, 10);
  to = new Date().toISOString().slice(0, 10);
  distributionChartData?: ChartData;
  dayTotalsChartData?: ChartData;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchCategoryDistributionReport();
    this.fetchDayTotalsReport();
  }

  async fetchDayTotalsReport() {
    const daysTotals = await this.dashboardService.fetchDayTotalsReport();
    this.dayTotalsChartData = {
      labels: daysTotals.map((date) => date.date),
      datasets: [
        {
          label: 'Expense amount',
          backgroundColor: '#48cab2a0',
          data: daysTotals.map((date) => date.totalAmount),
        },
      ],
    };
  }

  async fetchCategoryDistributionReport() {
    const distributions =
      await this.dashboardService.fetchCategoryDistributionReport(
        this.from,
        this.to
      );
    this.distributionChartData = {
      labels: distributions.map((dis) => dis.label),
      datasets: [
        {
          data: distributions.map((dis) => dis.totalAmount),
        },
      ],
    };
  }
}
