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

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchReport();
  }

  async fetchReport() {
    const distributions = await this.dashboardService.fetchExpenseReport(
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
