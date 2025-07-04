import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-region-filter',
  standalone: true,
  templateUrl: './region-filter.component.html',
  styleUrls: ['./region-filter.component.scss'],
})
export class RegionFilterComponent {
  @Input() region: string = '';
  @Input() regions: string[] = [];

  @Output() onRegion = new EventEmitter<string>();

  handleSelect(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.onRegion.emit(value);
  }
}
