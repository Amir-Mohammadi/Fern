export type UrlQuery = string | string[] | undefined;

class BaseUrlService {
  public replaceUnsafeCharactersFromUrl(url: string): string {
    return url.replace(' ', '-');
  }
}
export { BaseUrlService };
