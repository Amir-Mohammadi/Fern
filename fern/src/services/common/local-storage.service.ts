import { appendProjectPrefix } from '@Utils/append-project-prefix';

export enum LocalStorageKeys {
  PRODUCT_CATEGORIES_TREE = 'product-categories-tree',
  CART = 'cart',
}

class LocalStorageService {
  public get<T>(key: LocalStorageKeys): T | undefined {
    const keyWithPrefix = appendProjectPrefix(key);
    if (typeof window == 'undefined') return;
    //TODO: get types base of keys
    const stringData = window.localStorage.getItem(keyWithPrefix);

    if (stringData === null) return undefined;
    // using `(_, value) => value` for nested objects
    try {
      return JSON.parse(stringData, (_, value) => value) as T;
    } catch (error) {
      return (stringData! as any) as T;
    }
  }

  public set(key: LocalStorageKeys, data: object | string) {
    const keyWithPrefix = appendProjectPrefix(key);

    if (typeof window == 'undefined') return;

    var stringifiedData: string;

    if (typeof data == 'object') {
      // using `(_, value) => value` for nested objects
      stringifiedData = JSON.stringify(data, (_, value) => value);
    } else {
      stringifiedData = data;
    }

    window.localStorage.setItem(keyWithPrefix, stringifiedData);
  }
}

// singleton
const localStorageService = new LocalStorageService();
export default localStorageService;
