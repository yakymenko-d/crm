import { Component, OnInit } from '@angular/core'
import { AuthService } from './modules/shared/services/auth.service'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private translate: TranslateService
  ) {
    if (localStorage.getItem('systemLanguage')) {
      this.translate.use(localStorage.getItem('systemLanguage'));
    } else {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    }
  }

  ngOnInit() {
    const potentialToken = localStorage.getItem('auth-token')
    if (potentialToken !== null) {
      this.auth.setToken(potentialToken)
    }
  }
}
