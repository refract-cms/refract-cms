import { EntitySchema } from '@refract-cms/core';
import { AppNotification } from '../models/app-notification.model';

export interface NotificationState {
  notification: AppNotification | undefined;
}
