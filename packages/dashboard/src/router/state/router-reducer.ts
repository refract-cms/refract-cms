import type { RouterState } from './router-state';
import type { AppAction } from '../../state/app-action';
import { SET_BASE_ROUTE } from './router-actions';

const defaultState: RouterState = {
  routes: undefined,
};

export function routesReducer(state: RouterState = defaultState, action: AppAction): RouterState {
  switch (action.type) {
    case SET_BASE_ROUTE: {
      const routes = action.payload;
      return {
        routes,
      };
    }
    default: {
      return state;
    }
  }
}
