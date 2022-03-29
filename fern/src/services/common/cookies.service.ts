import { appendProjectPrefix } from '@Utils/append-project-prefix';
import { parseStringToObject } from '@Utils/common';
import cookie from 'js-cookie';

export enum CookieKeys {
  AUTHENTICATION_RESULT = 'authentication-result',
}

class CookieService {
  public getObject<T>(key: CookieKeys): T | undefined {
    const keyWithPrefix = appendProjectPrefix(key);

    if (typeof window == 'undefined') return;
    const stringData = cookie.get(keyWithPrefix);

    if (stringData === undefined) return;

    return parseStringToObject<T>(stringData);
  }

  public get(key: CookieKeys): string | undefined {
    const keyWithPrefix = appendProjectPrefix(key);

    if (typeof window == 'undefined') return;

    const stringData = cookie.get(keyWithPrefix);

    return stringData;
  }

  public set(key: CookieKeys, data: object | string): void {
    const keyWithPrefix = appendProjectPrefix(key);

    if (typeof window == 'undefined') return;

    var stringifiedData: string;

    if (typeof data == 'object') {
      // using `(_, value) => value` for nested objects
      stringifiedData = JSON.stringify(data, (_, value) => value);
    } else {
      stringifiedData = data;
    }

    cookie.set(keyWithPrefix, stringifiedData, {
      expires: 365,
      sameSite: 'strict',
    });
  }

  public remove(key: CookieKeys): void {
    const keyWithPrefix = appendProjectPrefix(key);

    cookie.remove(keyWithPrefix);
  }
}

// singleton
const cookieService = new CookieService();
export default cookieService;
