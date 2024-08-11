import { ActivatedRoute, Params } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, first, last, of, switchMap } from 'rxjs';

import { MaterialService } from '../modules/shared/classes/material.service';
import { NAME_VALIDATOR } from '../constants/general.constants';
import { ProfileService } from '../modules/shared/services/profile.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../modules/shared/interfaces';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../../app/app.component.scss'],
})
export class ProfileComponent {
  @ViewChild('input') inputRef: ElementRef;
  user$: Observable<User>;

  user: User;
  form: FormGroup;
  image: File;
  imagePreview;
  // isNew = true;
  // category: Category;
  value = 'Clear me';
  // categoryName: string = null;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.user$ = this.profileService.getUser();

    this.user$.subscribe((res) => console.log(res));

    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),
      theme: new FormControl('dark', Validators.required),
    });

    this.form.disable();

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          // if (params['id']) {
            return this.profileService.getUser();
          // }

          // return of(null);
        }),
      )
      .subscribe(
        (user: User) => {
          console.log(user);
          
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
          }

          this.form.enable();
        },
        (error) => MaterialService.toast(error.error.message),
      );

      this.form.valueChanges.subscribe(res => console.log(res)
      )
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
    // this.form.disable();

    const formValues = this.form.value;

    const data = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      role: formValues.role,
      theme: formValues.theme,
      // image: this.imagePreview,
    };

    obs$ = this.profileService.update(user._id, data);

    obs$.subscribe(
      (user) => {
        // this.user$.next(category)
        console.log(user);
        
        MaterialService.toast(
          this.translateService.instant('CATEGORIES.changes-saved'),
        );
        this.form.enable();
      },
      (error) => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      },
    );
  }
}
