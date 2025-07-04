// src/app/features/countries/components/country-search-bar.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-search-bar.component.html',
  styleUrls: ['./country-search-bar.component.scss'],
})
export class CountrySearchBarComponent {
  @Input() query: string = '';
  @Output() onSearch = new EventEmitter<string>();

  handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onSearch.emit(value);
  }
}
