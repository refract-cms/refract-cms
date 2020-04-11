import { action } from 'typesafe-actions';
import { Config } from '@refract-cms/core';

export const ADD_NOTIFICATION = '@@CMS/ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = '@@CMS/REMOVE_NOTIFICATION';

export const addNotification = (message: string) => {
  return action(ADD_NOTIFICATION, {
    message
  });
};

export const removeNotification = () => {
  return action(REMOVE_NOTIFICATION);
};
