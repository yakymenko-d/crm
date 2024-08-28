import { RouterModule, Routes } from '@angular/router';

import { AnalyticsPageComponent } from '../../analytics-page/analytics-page.component';
import { CategoriesFormComponent } from '../../categories-page/categories-form/categories-form.component';
import { CategoriesPageComponent } from '../../categories-page/categories-page.component';
import { HistoryPageComponent } from '../../history-page/history-page.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NgModule } from '@angular/core';
import { OrderCategoriesComponent } from '../../order-page/order-categories/order-categories.component';
import { OrderPageComponent } from '../../order-page/order-page.component';
import { OrderPositionsComponent } from '../../order-page/order-positions/order-positions.component';
import { OverviewPageComponent } from '../../overview-page/overview-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'settings',  loadChildren: () =>
        import('./../../modules/settings/settings.module').then((m) => m.SettingsModule)
      },
      { path: 'overview', component: OverviewPageComponent },
      { path: 'analytics', component: AnalyticsPageComponent },
      { path: 'history', component: HistoryPageComponent },
      {
        path: 'order',
        component: OrderPageComponent,
        children: [
          { path: '', component: OrderCategoriesComponent },
          { path: ':id', component: OrderPositionsComponent },
        ],
      },
      { path: 'categories', component: CategoriesPageComponent },
      { path: 'categories/new', component: CategoriesFormComponent },
      { path: 'categories/:id', component: CategoriesFormComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' } 
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
