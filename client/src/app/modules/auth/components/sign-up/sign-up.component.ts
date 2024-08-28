import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../sign-in/sign-in.component.scss'],
  host: {
    class: 'w100p',
  },
})
export class SignUpComponent implements OnInit, OnDestroy {
  @Output('updatePage') updatePage = new EventEmitter<boolean>();

  form: FormGroup;
  aSub: Subscription;
  changedAuthType: boolean = false;

  public showPassword: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  changeAuthType() {
    this.changedAuthType = true;
    this.router.navigate(['/', 'auth', 'sign-in']);
  }

  showPasswordAction() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.form.disable();
    this.aSub = this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/', 'overview'], {
          queryParams: {
            registered: true,
          },
        });
      },
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
