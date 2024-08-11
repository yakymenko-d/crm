import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'auth-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class AuthComponent {
  isUpdatePage = false;

  constructor(private readonly translate: TranslateService) {}

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('systemLanguage', lang);
  }

  updatePage(event): void {
    this.isUpdatePage = event;
  }
}
