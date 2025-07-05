import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Import CommonModule

@Component({
  selector: 'app-region-filter',
  standalone: true,
  imports: [CommonModule], // <-- Add it to the imports array
  templateUrl: './region-filter.component.html',
  styleUrls: ['./region-filter.component.scss'],
})
export class RegionFilterComponent {
  @Input() region: string = '';
  @Input() regions: string[] = [];
  @Output() onRegion = new EventEmitter<string>();

  public isOpen = false;

  // Inject ElementRef to get a reference to the component's host element
  constructor(private elementRef: ElementRef) {}

  // Listen for clicks on the entire document
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    // If the click is outside the component, close the dropdown
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  // Toggle the visibility of the dropdown panel
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  // Handle the selection of a new region
  selectRegion(newRegion: string): void {
    this.onRegion.emit(newRegion);
    this.isOpen = false; // Close the dropdown after selection
  }
}