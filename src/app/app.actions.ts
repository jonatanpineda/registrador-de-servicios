import {createAction, props} from '@ngrx/store';
import {TechService} from './app.models';
import {TechServicesFilter} from './app.constants';

export const upsertOneTechService = createAction(
  '[Tech Services] Upsert One',
  props<{techService: TechService}>()
);

export const deleteOneTechService = createAction(
  '[Tech Services] Delete One',
  props<{id: string}>()
);

export const selectTechService = createAction(
  '[Tech Services] Select',
  props<{id: string}>()
);

export const deselectTechService = createAction(
  '[Tech Services] Deselect'
);

export const selectTechServiceFilter = createAction(
  '[Tech Services] Select Filter',
  props<{selectedFilter: TechServicesFilter}>()
);

export const checkTechService = createAction(
  '[Tech Services] Check',
  props<{id: string}>()
);

export const uncheckTechService = createAction(
  '[Tech Services] Uncheck',
  props<{id: string}>()
);
