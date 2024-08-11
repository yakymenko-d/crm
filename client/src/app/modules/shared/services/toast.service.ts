import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { ToastItem } from '../interfaces';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  obsArray: BehaviorSubject<ToastItem[]> = new BehaviorSubject<ToastItem[]>([]);
  toasts$: Observable<any> = this.obsArray.asObservable();

  constructor() {}

  getToasts() {
    return this.toasts$;
  }

  addToast(toast) {
    this.getToasts()
      .pipe(take(1))
      .subscribe((res) => {
        let newArr = [...res, toast];
        this.obsArray.next(newArr);
        setTimeout(() => this.deleteToast(0), 3000);
      });
  }

  deleteToast(index) {
    this.getToasts()
      .pipe(take(1))
      .subscribe((res) => {
        let newArr = res;
        newArr.splice(index, 1);
        this.obsArray.next(newArr);
      });
  }
}
