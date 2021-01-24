import type { ConfigState } from '../config/state/config-state';
import type { RouterState } from '../router/state/router-state';
import type { AuthState } from '../auth/state/auth-state';
import type { NotificationState } from '../notifications/state/notification-state';
import type { EntityState } from '../entities/state/entity-state';

export interface AppState {
  config: ConfigState;
  router: RouterState;
  auth: AuthState;
  notification: NotificationState;
  entity: EntityState;
}
