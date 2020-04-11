import { ActionType } from 'typesafe-actions';
import * as ConfigActions from '../config/state/config-actions';
import * as RouterActions from '../router/state/router-actions';
import * as AuthActions from '../auth/state/auth-actions';
import * as NotificationActions from '../notifications/state/notification-actions';
import * as EntityState from '../entities/state/entity-actions';

export type AppAction = ActionType<
  typeof ConfigActions | typeof RouterActions | typeof AuthActions | typeof NotificationActions | typeof EntityState
>;
