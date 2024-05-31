import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

export interface HIHIHAHA<T> {
  totalPages: number;
  items: T[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular';
}
