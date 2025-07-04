// src/app/features/countries/components/country-card/country-card.component.ts

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country } from '../../../../core/models/country.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-card',
  standalone: true,
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
  imports: [CommonModule, RouterLink], // ✅ Enables pipes like | number
})
export class CountryCardComponent {
  @Input() country!: Country;
}
