import {EventAggregator} from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import {WebAPI} from './web-api';
import {CycleUpdated, CycleViewed} from './messages';
import {inject} from 'aurelia-framework';

@inject(WebAPI, EventAggregator, Router)
export class CycleList {
  constructor(api, ea, router) {
    this.api = api;
    this.cycles = [];
    this.router = router;

    ea.subscribe(CycleViewed, msg => this.select(msg.cycle.id));
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

  newCycle()
  {
    this.select("new");
    this.router.navigateToRoute('cycle-detail', {id:"new"});
  }

  select(id) {
    this.selectedId = id;
    return true;
  }
}
