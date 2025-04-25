import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [SearchComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() search = '';
  @Input() zoomOnSearch = false;
  @Output() searchUpdateEvent = new EventEmitter<string>();
  @Output() updateCountryEvent = new EventEmitter<string>();
  @Output() zoomOnSearchUpdateEvent = new EventEmitter<boolean>();

  onSearchUpdated(value: string) {
    this.searchUpdateEvent.emit(value);
  }

  onZoomOnSearchUpdated() {
    this.zoomOnSearch = !this.zoomOnSearch;
    this.zoomOnSearchUpdateEvent.emit(this.zoomOnSearch);
  }

  onUpdateCountry(country: string) {
    this.updateCountryEvent.emit(country);
  }
}
