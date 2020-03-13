import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {TechService} from './app.models';
import {ALL, TechServicesFilter} from './app.constants';
import {createReducer, on, Action} from '@ngrx/store';
import {
  checkTechService,
  deleteOneTechService,
  deselectTechService,
  selectTechService,
  selectTechServiceFilter, uncheckTechService,
  upsertOneTechService
} from './app.actions';

export interface TechServicesState extends EntityState<TechService> {
  selectedTechServiceId: string | null;
  selectedFilter: TechServicesFilter;
}

export function sortByTitle(a: TechService, b: TechService): number {
  return a.title.localeCompare(b.title);
}

export const techServiceAdapter: EntityAdapter<TechService> = createEntityAdapter<TechService>({
  sortComparer: sortByTitle
});

export const initialState: TechServicesState = techServiceAdapter.getInitialState({
  ids: ['123'],
  entities: {
    ['123']: {
      id: '123',
      title: 'Revisar bug de subida de archivos',
      author: 'Wolfgang Amadeus Mozart',
      description:
        'Al subirse los archivos se suben dos iguales',
      checked: false
    }
  },
  selectedTechServiceId: null,
  selectedFilter: ALL
});

const reducer = createReducer(
  initialState,
  on(upsertOneTechService, (state, {techService}) => techServiceAdapter.upsertOne(techService, state)),
  on(deleteOneTechService, (state, {id}) => techServiceAdapter.removeOne(id, state)),
  on(selectTechService, (state, {id}) => ({...state, selectedTechServiceId: id})),
  on(deselectTechService, (state) => ({...state, selectedTechServiceId: null})),
  on(selectTechServiceFilter, (state, {selectedFilter}) => ({...state, selectedFilter})),
  on(checkTechService, (state, {id}) => techServiceAdapter.updateOne({id, changes: {checked: true}}, state)),
  on(uncheckTechService, (state, {id}) => techServiceAdapter.updateOne({id, changes: {checked: false}}, state))
);

export function techServicesReducer(state: TechServicesState | undefined, action: Action) {
  return reducer(state, action);
}

const { selectEntities, selectAll } = techServiceAdapter.getSelectors();

export const getTechServicesEntities = selectEntities;
export const getAllTechServices = selectAll;

