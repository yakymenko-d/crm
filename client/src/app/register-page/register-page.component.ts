import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../modules/shared/services/auth.service';
import { ToastService } from '../modules/shared/services/toast.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss', '../login-page/login-page.component.scss'],
  host: {
    class: 'w100p'
  }
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  @Output('activate') activateEvents: EventEmitter<any>;
  form: FormGroup;
  aSub: Subscription;
  changedAuthType: boolean = false;

  public showPassword: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  changeAuthType() {
    this.changedAuthType = true;
    this.router.navigate(['login']);
  }

  showPasswordAction() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
      },
      err => {
        let newToast = {
          type: "error",
          typeTranslate: "TOAST.TYPE.error",
          text: err.error.message,
          status: err.error.status,
          translate: err.error.translate
        }
        this.toastService.addToast(newToast)
        this.form.enable()
      }
    )
  }

}
