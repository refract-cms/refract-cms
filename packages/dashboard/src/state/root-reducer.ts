import { combineReducers, Reducer } from 'redux';
import type { AppState } from './app-state';
import { configReducer } from '../config/state/config-reducer';
import { routesReducer } from '../router/state/router-reducer';
import { authReducer } from '../auth/state/auth-reducer';
import { notificationReducer } from '../notifications/state/notification-reducer';
import { entityReducer } from '../entities/state/entity-reducer';

export const rootReducer: Reducer<AppState> = combineReducers({
  config: configReducer,
  router: routesReducer,
  auth: authReducer,
  notification: notificationReducer,
  entity: entityReducer,
});
