const baseURL = '/api/rest/v1';

export const apiURL = (url: string) => `${baseURL}/${url}`;

export const readStorage = (key: string, fallback: string) => {
  try {
    return globalThis.localStorage?.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

export const writeStorage = (key: string, value: string) => {
  try {
    globalThis.localStorage?.setItem(key, value);
  } catch {
    return;
  }
};
