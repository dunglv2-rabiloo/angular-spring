import { CommonModule } from '@angular/common';
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
  imports: [RouterLink, CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalPages: number = 0;
  @Output() selectPage = new EventEmitter<number>();
  currentPage: number = 1;
  visiblePages: number[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentPage = Number(
      this.route.snapshot.queryParamMap.get('page') || 1
    );
    this.updateVisiblePages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages']) {
      this.updateVisiblePages();
    }
  }

  buildParams(page: number) {
    return { ...this.route.snapshot.queryParams, page };
  }

  handleSelectPage(page: number) {
    this.currentPage = page;
    this.selectPage.emit(page);
  }

  updateVisiblePages() {
    const visibles = [];
    if (this.totalPages > 0) visibles.push(1);
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
