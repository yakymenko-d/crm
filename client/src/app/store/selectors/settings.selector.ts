import { createSelector } from "@ngrx/store";
import { getAppState } from "./users.selector";

export const selectSettings = createSelector(
  getAppState,
  (state) => state.settingState.settings,
);

export const selectSettingsLogo = createSelector(
  getAppState,
  (state) => state.settingState.settings?.[0]?.image,
);
  
export const selectQrCodes = createSelector(
  getAppState,
  (state) => state.settingState.qrCodes,
);
  