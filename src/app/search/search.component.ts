import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() search = '';
  @Output() changeSearchEvent = new EventEmitter<string>();

  private timeout: any;

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.changeSearchEvent.emit(value);
    }, 1000);
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
  }
}
