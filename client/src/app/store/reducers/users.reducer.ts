import { Action, createReducer, on } from "@ngrx/store";
import { getMe, getMeFailure, getMeSuccess } from "../actions/users.action";

export interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
}

export interface UsersState {
    me: UserProfile | null;
}

export const initialUsersState: UsersState = {
    me: null
}

const usersReducer = createReducer(
    initialUsersState,
    on(getMe, (state) => ({
        ...state,
        isLoading: true,
    })),
    on(getMeSuccess, (state, { me }) => {
        return {
            ...state,
            me,
            isLoading: false,
        };
    }),
    on(getMeFailure, (state) => ({
        ...state,
        isLoading: false,
    })),
)

export function UsersReducer(
    state: UsersState | undefined,
    action: Action,
): UsersState {
    return usersReducer(state, action);
}