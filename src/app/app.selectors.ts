import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromTechService from './app.reducer';

const getTechServicesState = createFeatureSelector<fromTechService.TechServicesState>(
  'techServices'
);

export const getAllTechServices = createSelector(
  getTechServicesState,
  fromTechService.getAllTechServices
);

export const getTechServicesEntities = createSelector(
  getTechServicesState,
  fromTechService.getTechServicesEntities
);

export const getSelectedFilter = createSelector(
  getTechServicesState,
  (state) => state.selectedFilter
);

export const getVisibleTechServices = createSelector(
  getAllTechServices,
  getSelectedFilter,
  (techServices, selectedFilter) => {
    switch (selectedFilter) {
      case 'ALL':
        return techServices;
      case 'COMPLETED':
        return techServices.filter(t => t.checked);
      case 'UNCOMPLETED':
        return techServices.filter(t => !t.checked);
    }
  }
);

export const getSelectedTechServiceId = createSelector(
  getTechServicesState,
  (state) => state.selectedTechServiceId
);


export const getSelectedTechService = createSelector(
  getTechServicesEntities,
  getSelectedTechServiceId,
  (entities, selectedTechServiceId) =>
    selectedTechServiceId && entities[selectedTechServiceId]
);
