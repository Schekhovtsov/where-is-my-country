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
  @Input() zoomOnSearch = false;

  @Output() zoomOnSearchUpdateEvent = new EventEmitter<boolean>();

  onZoomOnSearchUpdated() {
    this.zoomOnSearch = !this.zoomOnSearch;
    this.zoomOnSearchUpdateEvent.emit(this.zoomOnSearch);
  }
}
