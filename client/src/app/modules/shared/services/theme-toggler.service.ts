import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ThemeTogglerService {
  itemValue = new BehaviorSubject(this.theItem);

  set theItem(value) {
    this.itemValue.next(value);
    localStorage.setItem('theme', value);
  }

  get theItem() {
    return localStorage.getItem('theme');
  }
}