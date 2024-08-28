import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './modules/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { EffectsModule } from '@ngrx/effects';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';
import { HistoryListComponent } from './history-page/history-list/history-list.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { LayoutModule } from './modules/layout/layout.module';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { NgModule } from '@angular/core';
import { OrderCategoriesComponent } from './order-page/order-categories/order-categories.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { OrderPositionsComponent } from './order-page/order-positions/order-positions.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { PositionsFormComponent } from './categories-page/categories-form/positions-form/positions-form.component';
import { SanitizerPipeModule } from '@shared/pipes/sanitizer/sanitizer-pipe.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SettingsEffects } from '@store/effects/settings.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { ToastComponent } from '@shared/components/toast/toast.component';
import { TokenInterceptor } from '@shared/classes/token.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserEffects } from '@store/effects/users.effects';
import { environment } from '../environments/environment';
import { reducers } from './store';

@NgModule({ declarations: [
        AppComponent,
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
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('app-state', reducers),
        StoreDevtoolsModule.instrument({
            maxAge: 100,
            logOnly: environment.production,
            connectInZone: true}),
        EffectsModule.forRoot([UserEffects, SettingsEffects]),
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AuthModule,
        LayoutModule,
        SanitizerPipeModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
    ], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: TokenInterceptor,
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
