import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputAutocompleteComponent } from '../../shared/input-autocomplete/input-autocomplete.component';
import { COUNTRIES_EN, COUNTRIES_RU } from '../../shared/lib/constants';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-header-search',
  standalone: true,
  imports: [CommonModule, InputAutocompleteComponent, TranslateModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() search = '';
  @Output() searchChangeEvent = new EventEmitter<string>();
  @Output() updateCountryEvent = new EventEmitter<string>();

  forceClose = false;
  lang: string = 'en';

  constructor(private translate: TranslateService) {
    this.lang = this.translate.getBrowserLang() || 'en';
  }

  get countries() {
    return this.lang === 'ru' ? COUNTRIES_RU : COUNTRIES_EN;
  }

  onSearchChange(value: string) {
    this.search = value;
    this.searchChangeEvent.emit(value);
  }

  changeSearchToRussia() {
    const country = this.lang === 'ru' ? 'Россия' : 'Russian Federation';
    this.search = country;
    this.updateCountryEvent.emit(country);
  }

  onItemClickHandler(item: string) {
    this.search = item;
    this.updateCountryEvent.emit(item);
  }

  findButtonHandler() {
    this.forceClose = true;
    this.updateCountryEvent.emit(this.search);
    setTimeout(() => {
      this.forceClose = false;
    }, 0);
  }

  onPressEnterHandler() {
    this.findButtonHandler();
  }
}
