import { Component } from '@angular/core';
import { Wallet } from './wallet.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  tablerCreditCard,
  tablerPlus,
  tablerWallet,
} from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-wallets',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, NgIconComponent],
  templateUrl: './wallets.component.html',
  styleUrl: './wallets.component.css',
  providers: [provideIcons({ tablerCreditCard, tablerWallet, tablerPlus })],
})
export class WalletsComponent {
  wallets: Wallet[] = [
    {
      id: 1,
      balance: 100,
      bank: 'Vietcombank',
      accountNumber: '0123456789',
    },
    {
      id: 2,
      balance: 200,
      name: 'Cash',
    },
  ];

  trackByWallet(_: number, wallet: Wallet) {
    return wallet.id;
  }
}
