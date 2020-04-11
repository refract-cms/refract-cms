import { AppAction } from "../../state/app-action";
import { NotificationState } from "./notification-state";
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from "./notification-actions";

const defaultState: NotificationState = {
  notification: undefined,
};

export function notificationReducer(
  state: NotificationState = defaultState,
  action: AppAction
): NotificationState {
  switch (action.type) {
    case ADD_NOTIFICATION: {
      return {
        ...state,
        notification: {
          message: action.payload.message,
        },
      };
    }
    case REMOVE_NOTIFICATION: {
      return {
        ...state,
        notification: undefined,
      };
    }
    default: {
      return state;
    }
  }
}
