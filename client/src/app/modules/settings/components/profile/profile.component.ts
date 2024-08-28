import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MaterialService } from '@shared/classes/material.service';
import { Observable } from 'rxjs';
import { ProfileService } from '@shared/services/profile.service';
import { Roles } from '../../../../constants/roles.enum';
import { Store } from '@ngrx/store';
import { ToastService } from '@shared/services/toast.service';
import { User } from '@shared/interfaces';
import { selectMe } from '@store/selectors/users.selector';
import { updateMe } from '@store/actions/users.action';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../../../../../app/app.component.scss'],
})
export class ProfileComponent {
  @ViewChild('input') inputRef: ElementRef;
  user$: Observable<User> = this.store.select(selectMe);

  user: User;
  form: FormGroup;
  image: File;
  imagePreview;
  hasChanges = false;
  roles: {value: Roles, label: string}[] = [
    { value: Roles.ADMIN, label: `${Roles.ADMIN}` },
    { value: Roles.CHEF, label: `${Roles.CHEF}` },
    { value: Roles.COOKER, label: `${Roles.COOKER}` },
    { value: Roles.WAITER, label: `${Roles.WAITER}` }
  ];

  private initialFormValues: any;

  constructor(
    private readonly profileService: ProfileService,
    private readonly store: Store,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      role: new FormControl(null, [Validators.required]),
      theme: new FormControl('dark', Validators.required),
    });

    this.form.disable();

    this.user$
      .subscribe(
        (user: User) => {
          if (user) {
            this.user = user;
            this.form.patchValue({
              firstName: user?.firstName,
              lastName: user?.lastName,
              role: user?.role,
              theme: user?.theme,
            });
            this.imagePreview = user?.image;
            MaterialService.updateTextInputs();
            this.initialFormValues = this.form.getRawValue();
          }

          this.form.enable();
        },
        (error) => MaterialService.toast(error.error.message),
      );

      this.form.valueChanges.subscribe((res) => {
        this.hasChanges = JSON.stringify(this.form.getRawValue()) !== JSON.stringify(this.initialFormValues);
      });
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onSubmit(user: User) {
    let obs$;
    this.form.disable();

    const formValues = this.form.value;

    const data = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      role: formValues.role,
      theme: formValues.theme,
      image: this.imagePreview,
      _id: user._id,
    };

    obs$ = this.profileService.update(user._id, data);

    this.store.dispatch(updateMe({me: data}))
    // .subscribe(
      // (user) => {
        let newToast = {
          type: 'success',
          typeTranslate: 'TOAST.TYPE.success',
          translate: 'CATEGORIES.changes-saved',
        };

        this.toastService.addToast(newToast);
        this.form.enable();
        this.hasChanges = false;
      // },
      // (error) => {
      //   MaterialService.toast(error.error.message);
      //   this.form.enable();
      //   this.hasChanges = false;
      // },
    // );
  }
}
