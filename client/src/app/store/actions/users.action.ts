import { createAction, props } from "@ngrx/store";
import { UserProfile } from "../reducers/users.reducer";

function scoped(string: TemplateStringsArray) {
    return `[Users] ${string[0]}`;
}

export const getMe = createAction(scoped`Load Me`);
export const getMeSuccess = createAction(
    scoped`Load Me Success`,
    props<{me: UserProfile }>()
);
export const getMeFailure = createAction(
    scoped`Load Me Failure`,
    props<{ error: unknown }>(),
);
