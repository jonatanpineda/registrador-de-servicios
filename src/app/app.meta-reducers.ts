import {ActionReducer, Action} from '@ngrx/store';
import {merge, pick} from 'lodash';
import {LOCAL_STORAGE_KEY} from './app.constants';

function setSavedState(state: any, key: string) {
  localStorage.setItem(key, JSON.stringify(state));
}
function getSavedState(key: string): any {
  return JSON.parse(localStorage.getItem(key));
}

const stateKeys = ['techServices'];

export function localStorageMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
  let onInit = true;

  return (state: S, action: A): S  => {
    const nextState = reducer(state, action);
    if (onInit) {
      onInit           = false;
      const savedState = getSavedState(LOCAL_STORAGE_KEY);
      return merge(nextState, savedState);
    }

    const stateToSave = pick(nextState, stateKeys);
    setSavedState(stateToSave, LOCAL_STORAGE_KEY);
    return nextState;
  };
}
