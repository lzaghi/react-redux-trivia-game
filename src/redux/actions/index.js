export const USER_LOGIN = 'USER_LOGIN';

export function userLogin(email) {
  return {
    type: USER_LOGIN,
    email,
  };
}
