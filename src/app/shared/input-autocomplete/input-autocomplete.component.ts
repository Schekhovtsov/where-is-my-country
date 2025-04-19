import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-autocomplete.component.html',
  styleUrl: './input-autocomplete.component.scss',
})
export class InputAutocompleteComponent {
  @Input() items: string[] = [];
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() onItemClick = new EventEmitter<string>();

  filteredItems: string[] = [];
  showDropdown = false;

  filterItems() {
    if (this.value.length) {
      this.showDropdown = true;
      this.filteredItems = this.items.filter((item) =>
        item.toLowerCase().includes(this.value.toLowerCase())
      );
    } else {
      this.showDropdown = false;
      this.filteredItems = [];
    }
  }

  selectItem(item: string) {
    this.value = item;
    this.valueChange.emit(item);
    this.onItemClick.emit(item);
    this.showDropdown = false;
  }
}
