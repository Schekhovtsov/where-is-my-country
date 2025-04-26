import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputAutocompleteComponent } from '../../shared/input-autocomplete/input-autocomplete.component';
import { COUNTRIES_EN, COUNTRIES_RU } from '../../shared/lib/constants';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SearchStateService } from '../../shared/services/search-state.service';

@Component({
  selector: 'app-header-search',
  standalone: true,
  imports: [CommonModule, InputAutocompleteComponent, TranslateModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  search = '';
  forceClose = false;
  lang: string = 'en';

  constructor(
    private translate: TranslateService,
    private searchState: SearchStateService
  ) {
    this.lang = this.translate.getBrowserLang() || 'en';

    this.searchState.search$.subscribe((value) => {
      this.search = value;
    });

    this.searchState.forceClose$.subscribe((value) => {
      this.forceClose = value;
    });
  }

  get countries() {
    return this.lang === 'ru' ? COUNTRIES_RU : COUNTRIES_EN;
  }

  onSearchChange(value: string) {
    this.search = value;
    this.searchState.updateSearch(value);
  }

  changeSearchToRussia() {
    const country = this.lang === 'ru' ? 'Россия' : 'Russian Federation';
    this.search = country;
    this.searchState.updateSearch(country);
    this.searchState.selectCountry(country);
  }

  onItemClickHandler(country: string) {
    this.search = country;
    this.searchState.updateSearch(country);
    this.searchState.selectCountry(country);
  }

  findButtonHandler() {
    if (this.search) {
      this.searchState.selectCountry(this.search);
    }
  }

  onPressEnterHandler() {
    this.findButtonHandler();
  }
}
