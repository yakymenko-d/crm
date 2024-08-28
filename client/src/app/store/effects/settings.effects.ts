import { Actions, createEffect, ofType } from '@ngrx/effects';
import { QrCode, Settings } from '@shared/interfaces';
import { addNewQrCodes, createSettings, deleteQrCode, getQrCodes, getQrCodesFailure, getQrCodesSuccess, getSettings, getSettingsFailure, getSettingsSuccess, updateSettings } from '../actions/settings.action';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { QRService } from '@shared/services/qr.service';
import { SettingsService } from '@shared/services/settings.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

@Injectable()
export class SettingsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly settingsService: SettingsService,
    private readonly qrService: QRService,
    private readonly store: Store,
  ) {}

  getSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSettings),
      switchMap(() => 
        this.settingsService.getSettings().pipe(
          map((settings: Settings) => getSettingsSuccess({ settings })),
          catchError((error: unknown) => of(getSettingsFailure({ error }))),
        ),
      ),
    ),
  );

  createSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createSettings),
      switchMap(({ settings }) => 
        this.settingsService.create(settings).pipe(
          map((settings: Settings) => getSettings()),
          // catchError((error: unknown) => of(getSettingsFailure({ error }))),
        ),
      ),
    ),
  );

  updateSettings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSettings),
      switchMap(({ settings }) => {
console.log(settings);

    
          console.log(111111111);
          
          return this.settingsService.update(settings).pipe(
            map((data: Settings) => getSettings()),
            // catchError((error: unknown) => of(getMeFailure({ error }))),
          )

      }
      ),
    ),
  );

  getQrCodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getQrCodes),
      switchMap(() =>
        this.qrService.getAllQrCodes().pipe(
          map((qrCodes: QrCode[]) => getQrCodesSuccess({ qrCodes })),
          catchError((error: unknown) => of(getQrCodesFailure({ error }))),
        ),
      ),
    ),
  );

  addNewQrCodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewQrCodes),
      switchMap(({ qrCodes }) =>
        this.qrService.addNewQrCodes(qrCodes).pipe(
          map(() => getQrCodes()),
          // catchError((error: unknown) => of(addNewQrCodesFailure({ error }))),
        )
      ),
    ),
  );

  deleteQrCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteQrCode),
      switchMap(({ qrCode }) =>
        this.qrService.deleteQR(qrCode).pipe(
          map(() => getQrCodes()),
          // catchError((error: unknown) => of(addNewQrCodesFailure({ error }))),
        )
      ),
    ),
  );
}
