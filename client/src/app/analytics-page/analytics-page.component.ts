import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  CategoryScale,
  Chart,
  ChartConfiguration,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
} from 'chart.js';

import { AnalyticsPage } from '../modules/shared/interfaces';
import { AnalyticsService } from '../modules/shared/services/analytics.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  PointElement,
);
@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: [
    './analytics-page.component.scss',
    '../../app/app.component.scss',
  ],
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gain') gainRef: ElementRef;
  @ViewChild('order') orderRef: ElementRef;

  aSub: Subscription;
  average: number;
  pending = true;

  constructor(
    private service: AnalyticsService,
    private translateService: TranslateService,
  ) {}

  ngAfterViewInit() {
    const gainConfig: ChartConfiguration<'line'> = {
      type: 'line',
      options: {
        responsive: true,
      },
      data: {
        labels: [this.translateService.instant('ANALYTICS.profit')],
        datasets: [
          {
            label: 'Gain',
            data: [],
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            fill: false,
          },
        ],
      },
    };

    const orderConfig: ChartConfiguration<'line'> = {
      type: 'line',
      options: {
        responsive: true,
      },
      data: {
        labels: [this.translateService.instant('ANALYTICS.orders')],
        datasets: [
          {
            label: 'Orders',
            data: [],
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            fill: false,
          },
        ],
      },
    };

    this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average;

      gainConfig.data.labels = data.chart.map((item) => item.label);
      gainConfig.data.datasets[0].data = data.chart.map((item) => item.gain);

      orderConfig.data.labels = data.chart.map((item) => item.label);
      orderConfig.data.datasets[0].data = data.chart.map((item) => item.order);

      const gainCtx = this.gainRef.nativeElement.getContext('2d');
      const orderCtx = this.orderRef.nativeElement.getContext('2d');
      gainCtx.canvas.height = '300px';
      orderCtx.canvas.height = '300px';

      new Chart(gainCtx, this.createChartConfig(gainConfig));
      new Chart(orderCtx, this.createChartConfig(orderConfig));

      this.pending = false;
    });
  }

  ngOnDestroy() {
    // if (this.aSub) {
    //   this.aSub.unsubscribe()
    // }
  }

  createChartConfig(
    configData: ChartConfiguration<'line'>,
  ): ChartConfiguration {
    console.log(configData);
    console.log(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--textColor')
        .trim(),
    );

    return {
      type: 'line',
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              font: {
                size: 14,
              },
              color: 'white', // X-axis labels color
            },
          },
          y: {
            ticks: {
              font: {
                size: 14,
              },
              color: 'white', // Y-axis labels color
            },
          },
        },
      },
      data: {
        labels: configData.data.labels,
        datasets: [
          {
            label: configData.data.datasets[0].label,
            data: configData.data.datasets[0].data,
            borderColor: configData.data.datasets[0].borderColor,
            fill: configData.data.datasets[0].fill,
          },
        ],
      },
    };
  }
}
