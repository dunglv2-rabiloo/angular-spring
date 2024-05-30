import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import {
  tablerGraph,
  tablerCash,
  tablerClipboardData,
  tablerPremiumRights,
} from '@ng-icons/tabler-icons';

interface NavItem {
  icon: string;
  path: string;
  label: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgIconComponent, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  items: NavItem[] = [
    {
      icon: tablerGraph,
      path: '/dashboard',
      label: 'Dashboard',
    },
    {
      icon: tablerCash,
      path: '/expenses',
      label: 'Expenses',
    },
    {
      icon: tablerPremiumRights,
      path: '/incomes',
      label: 'Incomes',
    },
    {
      icon: tablerClipboardData,
      path: '/reports',
      label: 'Reports',
    },
  ];
}
