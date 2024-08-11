import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { getMe, getMeFailure, getMeSuccess } from '../actions/users.action';

import { AuthService } from 'src/app/modules/shared/services/auth.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly auth: AuthService,
  ) {}

  getMe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getMe),
      switchMap(({ input }) =>
        this.auth.login(input).pipe(
          map(({ data }: any) => getMeSuccess({ me: data.me })),
          catchError((error: unknown) => of(getMeFailure({ error }))),
        ),
      ),
    ),
  );
}
