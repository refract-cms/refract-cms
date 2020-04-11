import { createStore } from "redux";
import { Store } from "redux";
import { AppState } from "./app-state";
import { rootReducer } from "./root-reducer";
// import throttle from 'lodash/throttle';

export const store: Store<AppState> = createStore(rootReducer);

// store.subscribe(
//   throttle(() => {
//     const state = store.getState();
//     localStorage.setItem('entityState', JSON.stringify(state.entity));
//   }, 1000)
// );
