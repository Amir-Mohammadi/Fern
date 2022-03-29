export function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export function parseStringToNumber(string: string): number {
  const parsedString = Number(string);

  if (isNaN(parsedString)) {
    throw new Error('parse string to number has failed');
  }

  return parsedString;
}

export function parseStringToObject<T>(string: string): T {
  try {
    return JSON.parse(string, (_, value) => value) as T;
  } catch (error) {
    throw new Error('cannot cast string to object');
  }
}

export function parseObjectToString(object: Object): string {
  try {
    return JSON.stringify(object, (_, value) => value);
  } catch (error) {
    throw new Error('cannot cast object to string');
  }
}

export function isNumber(string: string): boolean {
  return isNaN(Number(string));
}

export function priceFormat(price: number, local: string, currency: string) {
  return price.toLocaleString(local) + ' ' + currency;
}
