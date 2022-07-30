import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { ToastService } from '../../services/toast.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastItem } from '../../interfaces';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastAnimation', [
      state('in', style({
        opacity: 1,
        height: '*',
        transform: 'translateY(0px)'
      })),
      transition('in => void', [
        style({
          height: '*',
          opacity: 1
        }),
        animate('.15s ease-in-out',
          style({
            height: 0,
            opacity: 0
          })
        )
      ]),
      transition('void => in', [
        style({
          height: 0,
          opacity: 0
        }),
        animate('.15s ease-in-out',
          style({
            height: '*',
            opacity: 1
          })
        )
      ])
    ])
  ]
})
export class ToastComponent {

  public toasts: ToastItem[] = [];
  private destroy$ = new Subject();

  constructor(
    private toastService: ToastService
  ) {
    this.toastService.getToasts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.toasts = res;
      })
  }

  removeToast(index) {
    this.toastService.deleteToast(index)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
