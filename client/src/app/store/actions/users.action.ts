import { createAction, props } from '@ngrx/store';

import { User } from 'src/app/modules/shared/interfaces';

function scoped(string: TemplateStringsArray) {
  return `[Users] ${string[0]}`;
}

export const getMe = createAction(scoped`Load Me`);

export const getMeSuccess = createAction(
  scoped`Load Me Success`,
  props<{ me: User }>(),
);

export const getMeFailure = createAction(
  scoped`Load Me Failure`,
  props<{ error: unknown }>(),
);

export const updateMe = createAction(scoped`Update Me`,  props<{ me: Partial<User> }>());