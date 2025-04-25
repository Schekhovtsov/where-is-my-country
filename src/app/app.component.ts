import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateService } from '@ngx-translate/core';
import { COUNTRIES_EN, COUNTRIES_RU } from './shared/lib/constants';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MapComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['ru', 'en']);
    this.translate.setDefaultLang('ru');

    const lang = this.translate.getBrowserLang() || 'en';
    this.translate.use(lang);
    this.lang = lang;
  }

  lang = 'en';

  get countries() {
    return this.lang === 'ru' ? COUNTRIES_RU : COUNTRIES_EN;
  }

  search = '';
  country = '';
  zoomOnSearch = true;

  updateSearch(search: string) {
    this.search = search;
  }

  updateCountry(country: string) {
    this.country = country;
  }

  updateZoomOnSearch(newZoomOnSearchValue: boolean) {
    this.zoomOnSearch = newZoomOnSearchValue;
  }
}
