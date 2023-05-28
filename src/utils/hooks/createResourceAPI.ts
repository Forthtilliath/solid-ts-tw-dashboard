import { createResource } from "solid-js";

export async function fetcher(url: string) {
  const res = await fetch(url);
  return res.json();
}

export function createResourceAPI<T>(url: string) {
  return createResource<T>(() => fetcher(url));
}
