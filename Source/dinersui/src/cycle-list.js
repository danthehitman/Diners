import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {CycleUpdated, CycleViewed} from './messages';
import {inject} from 'aurelia-framework';

@inject(WebAPI, EventAggregator)
export class CycleList {
  constructor(api, ea) {
    this.api = api;
    this.cycles = [];

    ea.subscribe(CycleViewed, msg => this.select(msg.cycle));
    ea.subscribe(CycleUpdated, msg => {
      let id = msg.cycle.id;
      let found = this.cycles.find(x => x.id == id);
      Object.assign(found, msg.cycle);
    });
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
