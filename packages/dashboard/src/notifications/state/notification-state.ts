import { EntitySchema } from '@refract-cms/core';
import { AppNotification } from '../models/app-notification';

export interface NotificationState {
  notification: AppNotification | undefined;
}
