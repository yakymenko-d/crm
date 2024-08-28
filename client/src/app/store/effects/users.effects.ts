import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { getMe, getMeFailure, getMeSuccess, updateMe } from '../actions/users.action';

import { Injectable } from '@angular/core';
import { ProfileService } from '@shared/services/profile.service';
import { User } from '@shared/interfaces';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly profileService: ProfileService,
  ) {}

  getMe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMe),
      switchMap(() =>
        this.profileService.getUser().pipe(
          map((data: User) => getMeSuccess({ me: data })),
          catchError((error: unknown) => of(getMeFailure({ error }))),
        ),
      ),
    ),
  );

  updateMe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateMe),
      switchMap(({ me }) =>
        this.profileService.update(me._id, me).pipe(
          map((data: User) => getMe()),
          catchError((error: unknown) => of(getMeFailure({ error }))),
        ),
      ),
    ),
  );
}
