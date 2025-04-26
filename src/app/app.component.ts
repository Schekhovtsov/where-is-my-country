import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateService } from '@ngx-translate/core';
import { COUNTRIES_EN, COUNTRIES_RU } from './shared/lib/constants';
import { SearchStateService } from './shared/services/search-state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MapComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private searchState: SearchStateService
  ) {
    this.translate.addLangs(['ru', 'en']);
    this.translate.setDefaultLang('ru');

    const lang = this.translate.getBrowserLang() || 'en';
    this.translate.use(lang);
    this.lang = lang;
  }

  get countries() {
    return this.lang === 'ru' ? COUNTRIES_RU : COUNTRIES_EN;
  }

  lang = 'en';

  zoomOnSearch = true;

  updateZoomOnSearch(value: boolean) {
    this.zoomOnSearch = value;
  }
}
