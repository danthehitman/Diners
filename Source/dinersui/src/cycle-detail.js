import { computedFrom } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router} from 'aurelia-router';
import { CycleViewed } from './messages';
import { inject } from 'aurelia-framework';
import { WebAPI } from './web-api';
import { _ } from 'underscore';
import { Cycle, Bucket } from './model/cycle';

@inject(WebAPI, EventAggregator, Router)
export class CycleDetail {
  constructor(api, ea, router) {
    this.api = api;
    this.ea = ea;
    this.router = router;
  }

  // this is a framework lifecycle method that gets called right before the router activates this component.
  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.getCycleForDetails(params.id).then(cycle => {
      if (cycle != null && cycle != undefined) {
        this.cycle = cycle;
        this.routeConfig.navModel.setTitle(cycle.startDate);
        this.originalCycle = JSON.parse(JSON.stringify(cycle));
        this.ea.publish(new CycleViewed(this.cycle));
      }
      else{
        alert("No route found with id: " + params.id);
        this.cycle = {};
        this.router.navigateToRoute('cycles', {id:"new"});
      }
    });
  }

  get canSave() {
    return this.cycle.startDate && this.cycle.endDate && !this.api.isRequesting;
  }

  get budget() {
    return this.cycle.budget;
  }

  get savingsTarget() {
    return this.cycle.savingsTarget;
  }

  @computedFrom('budget', 'savingsTarget')
  get flex() {
    return this.cycle.budget - this.cycle.savingsTarget;
  }

  getCycleForDetails(id) {
    return new Promise(resolve => {
      let cycle = null;

      if (id.toLowerCase() == "new") {
        cycle = Cycle.newCycle();
      }
      else {
        cycle = this.api.getCycleDetails(id);
      }
      resolve(cycle);
    });
  }

  addBucket() {
    this.cycle.buckets.push(new Bucket());
  }

  save() {
    this.api.updateCycle(this.cycle).then(cycle => {
      this.cycle = cycle;
      this.routeConfig.navModel.setTitle(cycle.startDate);
      this.originalCycle = JSON.parse(JSON.stringify(cycle));
    });
  }

  // Cancel navigation away from this component if you wish.
  canDeactivate() {
    if (!_.isEqual(this.originalCycle, this.cycle)) {
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

      if (!result) {
        this.ea.publish(new CycleViewed(this.cycle));
      }

      return result;
    }

    return true;
  }
}
