import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Settings, User } from '@shared/interfaces';
import { createSettings, getSettings, updateSettings } from '@store/actions/settings.action';

import { MaterialService } from '@shared/classes/material.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToastService } from '@shared/services/toast.service';
import { selectMe } from '@store/selectors/users.selector';
import { selectSettings } from '@store/selectors/settings.selector';

@Component({
  selector: 'restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss', '../../../../../app/app.component.scss'],
})
export class RestaurantDetailsComponent {
  @Output() url = new EventEmitter<string>();
  @ViewChild('input') inputRef: ElementRef;

  settings$: Observable<Settings> = this.store.select(selectSettings);
  user$: Observable<User> = this.store.select(selectMe);

  form: FormGroup;
  hasChanges = false;
  savedSettings: Settings;
  image: File;
  imagePreview;
  mainColor: string = '#000';
  secondaryColor: string = '#000';

  private initialFormValues: any;
  
  constructor(
    private readonly store: Store,
    private readonly toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(getSettings());

    this.form = new FormGroup({
      restaurantName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
    });

    this.initialFormValues = this.form.getRawValue();
    this.form.disable();

    this.settings$
      .subscribe(
        (settings: Settings) => {
          this.savedSettings = settings[0];
          
          this.form.patchValue({
            restaurantName: this.savedSettings?.restaurantName,
            url: this.savedSettings?.url
          });

          this.imagePreview = this.savedSettings?.image;
          this.mainColor = this.savedSettings?.mainColor;
          this.secondaryColor = this.savedSettings?.secondaryColor;
          
          MaterialService.updateTextInputs();
          this.initialFormValues = this.form.getRawValue();

          this.form.enable();
          this.url.emit(this.savedSettings?.url);
        },
        (error) => MaterialService.toast(error.error.message),
      );
      
      this.form.valueChanges.subscribe((res) => {
        this.hasChanges = JSON.stringify(this.form.getRawValue()) !== JSON.stringify(this.initialFormValues) || (!!this.imagePreview && this.imagePreview !== this.savedSettings?.[0]?.image);
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

  handleMainColor(value: string): void {
    this.mainColor = value;
    this.updateSettings();
  }

  handleSecondaryColor(value: string): void {
    this.secondaryColor = value;
    this.updateSettings();
  }

  updateSettings(): void {
    const settings = {
      mainColor: this.mainColor,
      secondaryColor: this.secondaryColor,
      _id: this.savedSettings._id
    }

    this.store.dispatch(updateSettings({ settings }))
  }

  onSubmit(user: User) {
    let obs$;
    this.form.disable();

    const formValues = this.form.value;

    const settings = {
      restaurantName: formValues.restaurantName,
      url: formValues.url,
      image: this.imagePreview,
      _id: this.savedSettings._id
    };
    
    if(!!this.savedSettings) {
      this.store.dispatch(updateSettings({ settings }))
    } else {
      this.store.dispatch(createSettings({ settings }))
    }



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
        // MaterialService.toast(error.error.message);
        // this.form.enable();
        // this.hasChanges = false;
      // },
    // );
  }
}
