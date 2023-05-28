export function getSearchParams(url: string) {
  return new URLSearchParams(url.split("?")[1]);
}

export function getSearchParam(url: string, key: string) {
  return getSearchParams(url).get(key);
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isString(str: any): str is string {
  return typeof str === "string";
}