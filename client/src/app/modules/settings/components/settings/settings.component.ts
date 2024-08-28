import { Component } from '@angular/core';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss', '../../../../../app/app.component.scss'],
})
export class SettingsComponent {
  placeUrl!: string;
  
  constructor() {}

  handleUrl(url: string): void {
    this.placeUrl = url;
  }
}
