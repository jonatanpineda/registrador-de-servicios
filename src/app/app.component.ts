import { Component } from '@angular/core';

import { faPlus, faEdit, faTrash, faTimes, faFilter, faTasks, faCheck, faSquare } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';
import {select, Store} from '@ngrx/store';
import {TechServicesState} from './app.reducer';
import {FormBuilder} from '@angular/forms';
import {TechService} from './app.models';
import {Observable} from 'rxjs';
import {TechServicesFilter} from './app.constants';
import {getSelectedFilter, getSelectedTechService, getVisibleTechServices} from './app.selectors';
import {
  checkTechService,
  deleteOneTechService,
  deselectTechService,
  selectTechService, selectTechServiceFilter,
  uncheckTechService,
  upsertOneTechService
} from './app.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  serviceFormGroup = this.fb.group(AppComponent.createTechService());
  techServices$: Observable<TechService[]> = this.store.pipe(select(getVisibleTechServices));
  selectedTechService$: Observable<TechService> = this.store.pipe(select(getSelectedTechService));
  selectedFilter$: Observable<TechServicesFilter> = this.store.pipe(select(getSelectedFilter));

  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faTimes = faTimes;
  faFilter = faFilter;
  faTasks = faTasks;
  faCheck = faCheck;
  faSquare = faSquare;

  isEditing: boolean;


  static createTechService(): TechService {
    return {
      id: uuid(),
      title: '',
      author: '',
      description: '',
      checked: false
    };
  }

  constructor(
    public store: Store<{ techServices: TechServicesState}>,
    public fb: FormBuilder,
  ) {}

  onSelectTechService(id: string) {
    this.isEditing = false;
    this.store.dispatch(selectTechService({ id }));
  }

  onDeselectTechService() {
    this.isEditing = false;
    this.store.dispatch(deselectTechService());
  }

  onEditTechService(techService: TechService) {
    this.isEditing = true;
    this.serviceFormGroup.setValue(techService);
  }

  onAddNew() {
    this.serviceFormGroup.reset();
    this.serviceFormGroup.setValue(AppComponent.createTechService());
    this.isEditing = true;
  }

  onSaveTechService() {
    if (this.serviceFormGroup.valid) {
      const techService = this.serviceFormGroup.value;
      this.store.dispatch(upsertOneTechService({ techService }));
      this.store.dispatch(selectTechService({ id: techService.id }));
      this.isEditing = false;
    }
  }

  onDeleteTechService(techService: TechService) {
    this.store.dispatch(deleteOneTechService({id: techService.id}));
    this.isEditing = false;
  }

  onFilterTechServices(selectedFilter: TechServicesFilter) {
    this.store.dispatch(selectTechServiceFilter({ selectedFilter }));
  }

  onCheckTechService(techService: TechService) {
    if (techService.checked) {
      this.store.dispatch(uncheckTechService({id: techService.id}));
    } else {
      this.store.dispatch(checkTechService({id: techService.id}));
    }
  }

  onCancelEditTechService() {
    this.isEditing = false;
  }
}
