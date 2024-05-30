import { Component } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, NavComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
