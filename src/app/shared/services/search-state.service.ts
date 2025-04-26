import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchStateService {
  private searchSubject = new BehaviorSubject<string>('');
  private selectedCountrySubject = new BehaviorSubject<string>('');
  private forceCloseSubject = new BehaviorSubject<boolean>(false);

  search$: Observable<string> = this.searchSubject.asObservable();
  selectedCountry$: Observable<string> =
    this.selectedCountrySubject.asObservable();
  forceClose$: Observable<boolean> = this.forceCloseSubject.asObservable();

  get currentSearch(): string {
    return this.searchSubject.value;
  }

  get currentCountry(): string {
    return this.selectedCountrySubject.value;
  }

  updateSearch(search: string): void {
    this.searchSubject.next(search);
  }

  selectCountry(country: string): void {
    this.selectedCountrySubject.next(country);
    this.forceCloseDropdown();
  }

  forceCloseDropdown(): void {
    this.forceCloseSubject.next(true);

    setTimeout(() => {
      this.forceCloseSubject.next(false);
    }, 0);
  }
}
