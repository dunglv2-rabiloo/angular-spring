import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import {
  tablerCash,
  tablerClipboardData,
  tablerGraph,
  tablerPremiumRights,
  tablerLogout2,
} from '@ng-icons/tabler-icons';
import { AuthService } from '../auth/auth.service';

interface NavItem {
  icon: string;
  path?: string;
  label: string;
  action?: () => void;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgIconComponent, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  displayName = '';
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
    {
      icon: tablerLogout2,
      label: 'Sign out',
      action: () => {
        this.authService.signOut();
        this.router.navigate(['/signin']);
      },
    },
  ];

  constructor(authService: AuthService) {
    this.displayName = authService.user?.displayName || '';
  }
}
