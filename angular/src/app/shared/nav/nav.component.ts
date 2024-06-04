import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import {
  tablerGraph,
  tablerLogout2,
  tablerPremiumRights,
  tablerWallet,
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
      icon: tablerPremiumRights,
      path: '/expenses',
      label: 'Expenses',
    },
    {
      icon: tablerWallet,
      path: '/wallets',
      label: 'Wallets',
    },
    {
      icon: tablerLogout2,
      label: 'Sign out',
      action: async () => {
        await this.authService.signOut();
        this.router.navigate(['/signin']);
      },
    },
  ];

  constructor(authService: AuthService) {
    this.displayName = authService.user?.displayName || '';
  }
}
