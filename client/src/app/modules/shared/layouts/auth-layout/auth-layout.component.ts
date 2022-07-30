import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {

  public updatePage: boolean = false;

  constructor(
    private translate: TranslateService
  ) { }

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('systemLanguage', lang);
  }

  changedAuthType(res: boolean) {
    this.updatePage = true;
    setTimeout(() => {
      this.updatePage = false
    }, 500)
  }
}
