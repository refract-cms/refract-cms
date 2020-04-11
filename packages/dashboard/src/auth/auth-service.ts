export const authService = {
  isLoggedIn: () => 'access_token' in localStorage,
  setAccessToken: (accessToken: string) => localStorage.setItem('access_token', accessToken),
  removeAccessToken: () => localStorage.removeItem('access_token'),
  getAccessToken: () => localStorage.getItem('access_token')
};
