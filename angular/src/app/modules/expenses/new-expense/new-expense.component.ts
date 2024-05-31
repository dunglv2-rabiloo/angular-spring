import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tablerChevronLeft } from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-new-expense',
  standalone: true,
  imports: [RouterLink, NgIconComponent],
  templateUrl: './new-expense.component.html',
  styleUrl: './new-expense.component.css',
  viewProviders: [provideIcons({ tablerChevronLeft })],
})
export class NewExpenseComponent {}
