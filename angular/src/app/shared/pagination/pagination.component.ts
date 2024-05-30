import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  currentPage = 1;
  visiblePages = [1, 10, 11, 12, 50];

  constructor(router: ActivatedRoute) {
    this.currentPage = Number(router.snapshot.queryParamMap.get('page'));
  }

  selectPage(page: number) {
    this.currentPage = page;
  }
}
