import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnChanges, OnInit {
  @Input() totalPages: number = 0;
  @Output() onSelectPage = new EventEmitter();
  currentPage: number;
  visiblePages: number[] = [];

  constructor(router: ActivatedRoute) {
    this.currentPage = Number(router.snapshot.queryParamMap.get('page') || 1);
  }

  ngOnInit(): void {
    this.onSelectPage.emit(this.currentPage);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages']) {
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }

      this.updateVisiblePages();
    }
  }

  selectPage(page: number) {
    this.currentPage = page;
    this.updateVisiblePages();
    this.onSelectPage.emit(page);
  }

  updateVisiblePages() {
    const visibles = [1];
    if (this.currentPage - 1 > 1) {
      visibles.push(this.currentPage - 1);
    }
    if (this.currentPage > 1 && this.currentPage < this.totalPages) {
      visibles.push(this.currentPage);
    }
    if (this.currentPage + 1 < this.totalPages) {
      visibles.push(this.currentPage + 1);
    }
    if (this.totalPages > 1) {
      visibles.push(this.totalPages);
    }
    this.visiblePages = visibles;
  }
}
