import { AnyAction } from 'redux';
import { AuthState } from './auth.state';
import { SET_ACTIVE_USER_TOKEN } from './auth.actions';
import { authService } from '../auth.service';

export function authReducer(
  state: AuthState = {
    activeUserToken: authService.getAccessToken()
  },
  action: AnyAction
): AuthState {
  switch (action.type) {
    case SET_ACTIVE_USER_TOKEN: {
      return {
        ...state,
        activeUserToken: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
