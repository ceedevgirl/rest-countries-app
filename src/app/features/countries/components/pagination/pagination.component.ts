import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 12;
  @Output() pageChange = new EventEmitter<number>();

  totalPages = 0;
  pages: (number | string)[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['totalItems'] ||
      changes['itemsPerPage'] ||
      changes['currentPage']
    ) {
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.pages = this.getPaginationModel();
    }
  }

  selectPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  private getPaginationModel(): (number | string)[] {
    if (this.totalPages <= 2) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    // Calculate the starting page of the current pair (e.g., 1, 3, 5...)
    const startPage = Math.floor((this.currentPage - 1) / 2) * 2 + 1;

    const pagesToShow: (number | string)[] = [];

    // Add the starting page (e.g., 1, or 3, or 5)
    pagesToShow.push(startPage);

    // Add the next page if it exists
    if (startPage + 1 <= this.totalPages) {
      pagesToShow.push(startPage + 1);
    }

    // Add an ellipsis if there are more pages beyond the current pair
    if (startPage + 1 < this.totalPages) {
      pagesToShow.push('...');
    }

    return pagesToShow;
  }
}