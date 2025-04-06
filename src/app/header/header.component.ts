import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-header',
  imports: [SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() search = '';
  @Output() searchUpdatedEvent = new EventEmitter<string>();

  onSearchUpdated(value: string) {
    this.searchUpdatedEvent.emit(value); // Пробрасываем событие в App
  }
}
