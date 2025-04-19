import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputAutocompleteComponent } from '../../shared/input-autocomplete/input-autocomplete.component';
import { COUNTRIES_EN } from '../../shared/lib/constants';

@Component({
  selector: 'app-header-search',
  standalone: true,
  imports: [CommonModule, InputAutocompleteComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() search = '';
  @Output() changeSearchEvent = new EventEmitter<string>();

  countriesEn = COUNTRIES_EN;

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search = value;
  }

  changeSearchToRussia() {
    this.changeSearchEvent.emit('Russia');
  }

  findButtonHandler() {
    this.changeSearchEvent.emit(this.search);
  }

  onPressEnterHandler(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.changeSearchEvent.emit(this.search);
    }
  }
}
