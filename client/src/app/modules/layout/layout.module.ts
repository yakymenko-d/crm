import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SanitizerPipeModule } from '@shared/pipes/sanitizer/sanitizer-pipe.module';
import { SettingsModule } from '../settings/settings.module';
import { TogglerComponent } from './components/toggler/toggler.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    SanitizerPipeModule,
    LayoutRoutingModule,
    SettingsModule
  ],
  declarations: [LayoutComponent, HeaderComponent, TogglerComponent],
  exports: [LayoutComponent, HeaderComponent, TogglerComponent],
})
export class LayoutModule {}
