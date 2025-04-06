import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() search = '';
  @Output() changeSearchEvent = new EventEmitter<string>();

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
