import { AppAction } from '../../state/app-action';
import { ConfigState } from './config.state';
import { CONFIGURE } from './config.actions';

const defaultState: ConfigState = {
  serverUrl: '',
  schema: []
};

export function configReducer(state: ConfigState = defaultState, action: AppAction): ConfigState {
  switch (action.type) {
    case CONFIGURE: {
      return {
        ...state,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
}
