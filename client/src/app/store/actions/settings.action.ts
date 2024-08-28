import { QrCode, Settings } from '@shared/interfaces';
import { createAction, props } from '@ngrx/store';

function scoped(string: TemplateStringsArray) {
  return `[Settings] ${string[0]}`;
}

export const getSettings = createAction(scoped`Load Settings`);

export const getSettingsSuccess = createAction(
  scoped`Load Settings Success`,
  props<{ settings: Settings }>(),
);

export const getSettingsFailure = createAction(
  scoped`Load Settings Failure`,
  props<{ error: unknown }>(),
);

export const createSettings = createAction(scoped`Create Settings`,  props<{ settings: Partial<Settings> }>());

export const updateSettings = createAction(scoped`Update Settings`,  props<{ settings: Partial<Settings> }>());

export const getQrCodes = createAction(scoped`Load QR Codes`);

export const getQrCodesSuccess = createAction(
  scoped`Load QR Codes Success`,
  props<{ qrCodes: QrCode[] }>(),
);

export const getQrCodesFailure = createAction(
  scoped`Load QR Codes Failure`,
  props<{ error: unknown }>(),
);

export const addNewQrCodes = createAction(scoped`Add New Qr Codes`, props<{ qrCodes: QrCode[] }>());

export const deleteQrCode = createAction(scoped`Delete Qr Code`, props<{ qrCode: QrCode }>());