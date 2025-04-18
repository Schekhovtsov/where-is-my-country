import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-header',
  imports: [SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() search = '';
  @Input() zoomOnSearch = false;
  @Output() searchUpdateEvent = new EventEmitter<string>();
  @Output() zoomOnSearchUpdateEvent = new EventEmitter<boolean>();

  onSearchUpdated(value: string) {
    this.searchUpdateEvent.emit(value);
  }

  onZoomOnSearchUpdated() {
    this.zoomOnSearch = !this.zoomOnSearch;
    this.zoomOnSearchUpdateEvent.emit(this.zoomOnSearch);
  }
}
