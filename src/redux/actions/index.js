export const USER_LOGIN = 'USER_LOGIN';

export function userLogin(email, name) {
  return {
    type: USER_LOGIN,
    email,
    name,
  };
}
