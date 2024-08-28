import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MaterialInstance,
  MaterialService,
} from '@shared/classes/material.service';
import { NavigationEnd, Router } from '@angular/router';
import { Order, OrderPosition } from '@shared/interfaces';

import { OrderService } from './order.service';
import { OrdersService } from '@shared/services/orders.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss', '../../app/app.component.scss'],
  providers: [OrderService],
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  oSub: Subscription;
  isRoot: boolean;
  pending = false;

  constructor(
    private router: Router,
    private ordersService: OrdersService,
    private translateService: TranslateService,
    public order: OrderService,
  ) {}

  ngOnInit() {
    this.isRoot = this.router.url === '/order';
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }

  ngOnDestroy() {
    // this.modal.destroy()
    // if (this.oSub) {
    // this.oSub.unsubscribe()
    // }
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition);

    if (!this.order.list.length) {
      this.cancel();
    }
  }

  open() {
    this.modal.open();
  }

  cancel() {
    this.modal.close();
  }

  submit() {
    this.pending = true;

    const order: Order = {
      list: this.order.list.map((item) => {
        delete item._id;
        return item;
      }),
    };

    this.oSub = this.ordersService.create(order).subscribe(
      (newOrder) => {
        MaterialService.toast(
          `${this.translateService.instant('ORDERS.order-added-1')} №${newOrder.order} ${this.translateService.instant('ORDERS.order-added-2')}`,
        );
        this.order.clear();
      },
      (error) => MaterialService.toast(error.error.message),
      () => {
        this.modal.close();
        this.pending = false;
      },
    );
  }
}
