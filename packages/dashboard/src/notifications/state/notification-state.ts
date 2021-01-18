import type { AppNotification } from '../models/app-notification';

export interface NotificationState {
  notification: AppNotification | undefined;
}
