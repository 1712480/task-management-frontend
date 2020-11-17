export const USER_ACTIONS = {
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
};

export const userLogin = (user) => ({
  type: USER_ACTIONS.USER_LOGIN,
  payload: user,
});

export const userLogout = (user) => ({
  type: USER_ACTIONS.USER_LOGOUT,
  payload: user,
});
