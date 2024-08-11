import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../shared/services/auth.service';
import { EMAIL_VALIDATOR } from '../../../../constants/general.constants';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../shared/services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/modules/shared/interfaces';
import { getMe } from 'src/app/store/actions/users.action';

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  host: {
    class: 'w100p',
  },
})
export class SignInComponent implements OnInit, OnDestroy {
  @Output('updatePage') updatePage = new EventEmitter<boolean>();

  form: FormGroup;
  aSub: Subscription;
  // changedAuthType = false;
  // public updatePage = false;
  public lang: string;
  public showPassword = false;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly translate: TranslateService,
    private readonly toastService: ToastService,
    private readonly store: Store,
  ) {
    this.lang = this.translate.currentLang;
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(EMAIL_VALIDATOR),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.route.queryParams.subscribe((params: Params) => {
      console.log(params);

      if (params['registered']) {
        let newToast = {
          type: 'success',
          typeTranslate: 'TOAST.TYPE.success',
          translate: 'TOAST.can-login',
        };
        this.toastService.addToast(newToast);
      } else if (params['accessDenied']) {
        let newToast = {
          type: 'error',
          typeTranslate: 'TOAST.TYPE.error',
          translate: 'TOAST.first-login',
        };
        this.toastService.addToast(newToast);
      } else if (params['sessionFailed']) {
        let newToast = {
          type: 'error',
          typeTranslate: 'TOAST.TYPE.error',
          translate: 'TOAST.please-login',
        };
        this.toastService.addToast(newToast);
      }
    });
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  changeAuthType() {
    // this.updatePage.emit(true);
    //   setTimeout(() => {
    //     this.updatePage.emit(false);
    //   }, 500)

    // this.changedAuthType = true;
    console.log(123);

    this.router.navigate(['/', 'auth', 'sign-up']);
  }

  showPasswordAction() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.form.disable();

    // const input: User = {
    //   email: this.form.value.email,
    //   password: this.form.value.password
    // }

    // this.store.dispatch(getMe({input}));
    // this.router.navigate(['/overview']);
    // this.form.enable()

    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      (err) => {
        let newToast = {
          type: 'error',
          typeTranslate: 'TOAST.TYPE.error',
          text: err.error.message,
          status: err.error.status,
          translate: err.error.translate,
        };
        this.toastService.addToast(newToast);
        this.form.enable();
      },
    );
  }
}