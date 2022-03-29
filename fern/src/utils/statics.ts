export const BASE_URL = 'http://127.0.0.1:5000';

export const STATIC_TEMP_FILE = `${BASE_URL}/document.ashx?fk=`;
export const STATIC_FILE = (id: string, rowVersion: string) => `${BASE_URL}/document.ashx?id=${id}&rv=${rowVersion}`;

export const API = {
  V1: `${BASE_URL}/api/v1`,
};

export const ROUTES = {
  MARKET_STUFF_CATEGORIES: 'market-stuff-categories',
  MARKET_BRIEF_STUFFS: 'market-brief-stuffs',
  MARKET_STUFFS: 'market-stuffs',
  MARKET_BRANDS: 'market-brands',
  PROVINCES: 'provinces',
  PRODUCTS: 'products',
  USERS: 'users',
  ME: 'me',
};
