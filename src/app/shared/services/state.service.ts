import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private search = new BehaviorSubject<string>('');
  private country = new BehaviorSubject<string>('');
  private forceClose = new BehaviorSubject<boolean>(false);
  // Язык тоже можно добавить в State

  search$: Observable<string> = this.search.asObservable();
  country$: Observable<string> = this.country.asObservable();
  forceClose$: Observable<boolean> = this.forceClose.asObservable();

  get currentSearch(): string {
    return this.search.value;
  }

  get currentCountry(): string {
    return this.country.value;
  }

  onChangeSearch(search: string): void {
    this.search.next(search);
  }

  onSelectCountry(country: string): void {
    this.country.next(country);
    this.onCloseDropdown();
  }

  onCloseDropdown(): void {
    this.forceClose.next(true);

    setTimeout(() => {
      this.forceClose.next(false);
    }, 0);
  }
}
