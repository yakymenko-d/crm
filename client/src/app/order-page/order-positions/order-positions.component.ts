import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';

import { MaterialService } from '../../modules/shared/classes/material.service';
import { Observable } from 'rxjs/index';
import { OrderService } from '../order.service';
import { Position } from '../../modules/shared/interfaces';
import { PositionsService } from '../../modules/shared/services/positions.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: [
    './order-positions.component.scss',
    '../../../app/app.component.scss',
  ],
})
export class OrderPositionsComponent implements OnInit {
  positions$: Observable<Position[]>;

  constructor(
    private route: ActivatedRoute,
    private positionsService: PositionsService,
    private order: OrderService,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.positionsService.fetch(params['id']);
      }),
      map((positions: Position[]) => {
        return positions.map((position) => {
          position.quantity = 1;
          return position;
        });
      }),
    );
  }

  addToOrder(position: Position) {
    MaterialService.toast(
      `${this.translateService.instant('ORDERS.position-added-1')} x${position.quantity} ${position.name}${position.quantity > 1 ? "'s" : ''}`,
    );
    this.order.add(position);
  }
}
