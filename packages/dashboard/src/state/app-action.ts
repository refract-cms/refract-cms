import type { ActionType } from 'typesafe-actions';
import type * as ConfigActions from '../config/state/config-actions';
import type * as RouterActions from '../router/state/router-actions';
import type * as AuthActions from '../auth/state/auth-actions';
import type * as NotificationActions from '../notifications/state/notification-actions';
import type * as EntityState from '../entities/state/entity-actions';

export type AppAction = ActionType<
  typeof ConfigActions | typeof RouterActions | typeof AuthActions | typeof NotificationActions | typeof EntityState
>;
