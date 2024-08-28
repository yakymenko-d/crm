import { Action, createReducer, on } from '@ngrx/store';
import { QrCode, Settings } from '@shared/interfaces';
import { getQrCodes, getQrCodesFailure, getQrCodesSuccess, getSettings, getSettingsFailure, getSettingsSuccess } from '../actions/settings.action';

export interface SettingsState {
  settings: Settings;
  qrCodes: QrCode[];
}

export const initialSettingsState: SettingsState = {
  settings: {
    restaurantName: '',
    url: '',
    image: ''
  },
  qrCodes: [],
};

const settingsReducer = createReducer(
  initialSettingsState,
  on(getSettings, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getSettingsSuccess, (state, { settings }) => {
    return {
      ...state,
      settings,
      isLoading: false,
    };
  }),
  on(getSettingsFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(getQrCodes, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(getQrCodesSuccess, (state, { qrCodes }) => {
    return {
      ...state,
      qrCodes: qrCodes.sort((a, b) => a.order - b.order),
      isLoading: false,
    };
  }),
  on(getQrCodesFailure, (state) => ({
    ...state,
    isLoading: false,
  })),
);

export function SettingsReducer(
  state: SettingsState | undefined,
  action: Action,
): SettingsState {
  return settingsReducer(state, action);
}
