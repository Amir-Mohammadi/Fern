export const queryBuilder = (query: any): URLSearchParams => {
  var params: URLSearchParams = new URLSearchParams();

  for (const key in query) {
    if (key == 'id') {
      params.append('categories', query[key]);
    }
    if (key == 'categories') {
      params.append('categories', query[key]);
    }
    if (key == 'brand') {
      params.append('brands', query[key]);
    }
  }
  return params;
};

export const espQueryBuilder = (filterQueryString: Array<{ key: number | string; values: Array<number | string> }>) => {
  var querystring = ``;

  filterQueryString.forEach((param, i) => {
    if (querystring.length == 0) {
      querystring = querystring + `esp[${i}].Key=${param.key}`;
    } else {
      querystring = querystring + `&esp[${i}].Key=${param.key}`;
    }
    param.values.forEach((value) => {
      querystring = querystring + `&esp[${i}].Values=${value}`;
    });
  });

  return querystring;
};
