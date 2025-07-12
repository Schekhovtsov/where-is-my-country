import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateService } from '@ngx-translate/core';
import { COUNTRIES_EN, COUNTRIES_RU } from './shared/lib/constants';
import { StateService } from './shared/services/state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MapComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  lang = 'en';
  zoomOnSearch = true;

  constructor(
    private translate: TranslateService,
    private state: StateService
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

  updateZoomOnSearch(value: boolean) {
    this.zoomOnSearch = value;
  }
}
