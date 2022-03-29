export const BASE_URL = 'http://localhost:5000/';
export const STATIC_TEMP_FILE = `${BASE_URL}document.ashx?fk=;`;
export const API_URL = {
  V1: `${BASE_URL}api/v1`,
};
export const PRODUCT_CATEGORY_ID = {
  FRIDGE_FREEZER: 71,
  COOLING: 72,
};
export const getStaticURl = (guid: string, rowVersion: string) =>
  `${BASE_URL}document.ashx?id=${guid}&rv=${rowVersion}`;

export const ProjectPrefix = {
  ELESSEL: 'el',
};
