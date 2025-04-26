import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchStateService } from '../services/search-state.service';

@Component({
  selector: 'app-input-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-autocomplete.component.html',
  styleUrl: './input-autocomplete.component.scss',
})
export class InputAutocompleteComponent {
  @Input() items: Record<string, string> = {};
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() forceClose: boolean = false;
  @Output() valueChange = new EventEmitter<string>();
  @Output() onItemClick = new EventEmitter<string>();

  filteredItems: Record<string, string> = {};
  showDropdown = false;
  Object = Object;

  onInputChange() {
    this.valueChange.emit(this.value);
    if (this.value.length) {
      this.showDropdown = true;
      this.filteredItems = Object.fromEntries(
        Object.entries(this.items).filter(([country]) =>
          country.toLowerCase().includes(this.value.toLowerCase())
        )
      );
    } else {
      this.showDropdown = false;
      this.filteredItems = {};
    }
  }

  onItemClickHandler(item: string) {
    this.value = item;
    this.onItemClick.emit(item);
    this.showDropdown = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['forceClose'] && changes['forceClose'].currentValue === true) {
      this.showDropdown = false;
    }
  }
}
