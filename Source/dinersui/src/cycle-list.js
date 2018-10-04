import {WebAPI} from './web-api';
import {inject} from 'aurelia-framework';

@inject(WebAPI)
export class CycleList {
  constructor(api) {
    this.api = api;
    this.cycles = [];
  }

  // Aurelia life-cycle event that is called when the view and view models are loaded.
  created() {
    this.api.getCycleList().then(cycles => this.cycles = cycles);
  }

  select(cycle) {
    this.selectedId = cycle.id;
    return true;
  }
}
