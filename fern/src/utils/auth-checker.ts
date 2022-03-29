import Cookies from 'js-cookie';

export const getSession = () => {
  var token = Cookies.get('__token');
  if (token) {
    return true;
  }

  return false;
};

export const getToken = () => {
  var token = Cookies.get('__token');

  return `Bearer ${token}`;
};

export const logout = () => {
  Cookies.remove('__token');
};
