import { authService } from '../auth.service';
import { action } from 'typesafe-actions';

export const SET_ACTIVE_USER_TOKEN = '@@CMS/SET_ACTIVE_USER_TOKEN';

export function setActiveUserToken(token: string | null) {
  if (token) {
    authService.setAccessToken(token);
  } else {
    authService.removeAccessToken();
  }
  return action(SET_ACTIVE_USER_TOKEN, token);
}

export const logout = () => {
  return setActiveUserToken(null);
};

// export const checkLocalStorageForAccessToken = () => setActiveUserToken(authService.getAccessToken());
