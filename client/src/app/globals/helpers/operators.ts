// hack for store selection with strict TS mode
export const isDefined = <T>(arg: T | null | undefined): arg is T => {
  return arg !== null && arg !== undefined;
};

export const isNotDefined = <T>(
  arg: T | null | undefined,
): arg is null | undefined => {
  return arg === null || arg === undefined;
};

export const isTruthy = (arg: boolean | null | undefined): arg is boolean => {
  return !!arg;
};

export const isJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    console.warn(e);

    return false;
  }

  return true;
};
