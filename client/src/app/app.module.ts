import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '../environments/environment';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component';
import { PositionsFormComponent } from './categories-page/categories-form/positions-form/positions-form.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';
import { HistoryListComponent } from './history-page/history-list/history-list.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { OrderCategoriesComponent } from './order-page/order-categories/order-categories.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { OrderPositionsComponent } from './order-page/order-positions/order-positions.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { TogglerComponent } from './shared/components/toggler/toggler.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SafeHtmlPipe } from './shared/pipes/sanitizer/sanitizer.pipe';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    CategoriesPageComponent,
    LoaderComponent,
    CategoriesFormComponent,
    PositionsFormComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
    HistoryListComponent,
    HistoryFilterComponent,
    ToastComponent,
    TogglerComponent,
    HeaderComponent,
    SafeHtmlPipe
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}