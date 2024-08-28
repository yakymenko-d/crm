import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { AnalyticsService } from '@shared/services/analytics.service';
import {
  MaterialInstance,
} from '@shared/classes/material.service';
import { Observable } from 'rxjs/index';
import { OverviewPage } from '@shared/interfaces';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss', '../../app/app.component.scss'],
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tapTarget') tapTargetRef: ElementRef;
  tapTarget: MaterialInstance;
  data$: Observable<OverviewPage>;

  today = new Date();
  yesterday = new Date();

  constructor(
    private service: AnalyticsService
  ) {}

  ngOnInit() {
    this.data$ = this.service.getOverview();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  ngAfterViewInit() {
    // this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)
  }

  ngOnDestroy() {
    // this.tapTarget.destroy()
  }

  openInfo() {
    this.tapTarget.open();
  }
}
