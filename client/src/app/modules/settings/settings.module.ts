import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './components/profile/profile.component';
import { QRCodeModule } from 'angularx-qrcode';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { TablesManagementComponent } from './components/tables-management/tables-management.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    SettingsRoutingModule,
    QRCodeModule,
    ColorPickerModule
  ],
  declarations: [SettingsComponent, ProfileComponent, TablesManagementComponent,RestaurantDetailsComponent],
  exports: [SettingsComponent, ProfileComponent, TablesManagementComponent, RestaurantDetailsComponent],
})
export class SettingsModule {}
