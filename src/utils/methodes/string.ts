export function getSearchParams(url: string) {
  return new URLSearchParams(url.split("?")[1]);
}

export function getSearchParam(url: string, key: string) {
  return getSearchParams(url).get(key);
}
