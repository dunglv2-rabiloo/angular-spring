import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerPlus, tablerFilter } from '@ng-icons/tabler-icons';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

interface Expense {
  id: number;
  subject: string;
  category: string;
  source: string;
  date: Date;
}

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [RouterLink, NgIconComponent, DatePipe, PaginationComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
  viewProviders: [provideIcons({ tablerPlus, tablerFilter })],
})
export class ExpensesComponent {
  expenses: Expense[] = [
    {
      id: 1,
      subject: 'Unknown',
      category: 'Trivial',
      source: 'Wallet',
      date: new Date(),
    },
    {
      id: 2,
      subject: 'Unknown',
      category: 'Trivial',
      source: 'Wallet',
      date: new Date(),
    },
    {
      id: 3,
      subject: 'Unknown',
      category: 'Trivial',
      source: 'Wallet',
      date: new Date(),
    },
  ];
}
