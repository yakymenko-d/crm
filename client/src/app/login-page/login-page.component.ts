import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { EMAIL_VALIDATOR } from '../constants/general.constants';
import { AuthService } from '../modules/shared/services/auth.service';
import { ToastService } from '../modules/shared/services/toast.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  host: {
    class: 'w100p'
  }
})

export class LoginPageComponent implements OnInit, OnDestroy {

  @Output('activate') activateEvents: EventEmitter<any>;

  form: FormGroup;
  aSub: Subscription;
  changedAuthType: boolean = false;
  
  public lang: string;
  public showPassword: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private toastService: ToastService
  ) {
    this.lang = this.translate.currentLang;
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(EMAIL_VALIDATOR)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        let newToast = {
          type: "success",
          typeTranslate: "TOAST.TYPE.success",
          translate: "TOAST.can-login"
        }
        this.toastService.addToast(newToast);
      } else if (params['accessDenied']) {
        let newToast = {
          type: "error",
          typeTranslate: "TOAST.TYPE.error",
          translate: "TOAST.first-login"
        }
        this.toastService.addToast(newToast);
      } else if (params['sessionFailed']) {
        let newToast = {
          type: "error",
          typeTranslate: "TOAST.TYPE.error",
          translate: "TOAST.please-login"
        }
        this.toastService.addToast(newToast);
      }
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  changeAuthType() {
    this.changedAuthType = true;
    this.router.navigate(['register']);
  }

  showPasswordAction() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.form.disable()

    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      err => {
        let newToast = {
          type: "error",
          typeTranslate: "TOAST.TYPE.error",
          text: err.error.message,
          status: err.error.status,
          translate: err.error.translate
        }
        this.toastService.addToast(newToast);
        this.form.enable()
      }
    )
  }
}