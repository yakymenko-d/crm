import { AuthComponent } from './components/view/view.component';
import { AuthorizationRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    AuthorizationRoutingModule,
  ],
  declarations: [AuthComponent, SignInComponent, SignUpComponent],
  exports: [AuthComponent, SignInComponent, SignUpComponent],
})
export class AuthModule {}
