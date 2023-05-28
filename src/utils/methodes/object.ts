export function isObject(item: unknown) {
  return item && typeof item === "object" && !Array.isArray(item);
}

type TObject<T extends any = any> = Record<string, T>;

type ReturnMergeDeep<
  T extends TObject,
  U extends TObject | undefined
> = U extends undefined ? T : Record<keyof T | keyof U[][number], any>;

export function mergeDeep<T extends TObject, U extends TObject>(
  target: T,
  ...sources: (U | undefined)[]
): ReturnMergeDeep<T, U> {
  if (!sources || !sources.length) return target as ReturnMergeDeep<T, U>;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key] as T, source[key] as U);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
