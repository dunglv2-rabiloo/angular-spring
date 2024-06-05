import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerCamera,
  tablerGraph,
  tablerLogout2,
  tablerPremiumRights,
  tablerWallet,
} from '@ng-icons/tabler-icons';
import { AuthService, User } from '../auth/auth.service';

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
  viewProviders: [provideIcons({ tablerCamera })],
})
export class NavComponent {
  private router = inject(Router);

  user: User = { displayName: '', avatar: '#' };
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

  constructor(private authService: AuthService) {
    this.fetchUserProfiles();
  }

  async fetchUserProfiles() {
    this.user = await this.authService.getUserProfiles();
  }

  changeAvatar() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        await this.authService.changeAvatar(file);
        this.fetchUserProfiles();
      }
    };
    input.click();
  }
}
