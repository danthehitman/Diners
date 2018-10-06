import {computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {CycleUpdated,CycleViewed} from './messages';
import {inject} from 'aurelia-framework';
import {WebAPI} from './web-api';
import {_} from 'underscore';

@inject(WebAPI, EventAggregator)
export class CycleDetail {
  constructor(api, ea){
    this.api = api;
    this.ea = ea;
  }

  // this is a framework lifecycle method that gets called right before the router activates this component.
  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.api.getCycleDetails(params.id).then(cycle => {
      this.cycle = cycle;
      this.routeConfig.navModel.setTitle(cycle.startDate);
      this.originalCycle = JSON.parse(JSON.stringify(cycle));
      this.ea.publish(new CycleViewed(this.cycle));
    });
  }

  get canSave() {
    return this.cycle.startDate && this.cycle.endDate && !this.api.isRequesting;
  }

  get budget()
  {
    return this.cycle.budget;
  }

  get savingsTarget()
  {
    return this.cycle.savingsTarget;
  }

  @computedFrom('budget', 'savingsTarget')
  get flex()
  {
    return this.cycle.budget - this.cycle.savingsTarget;
  }

  save() {
    this.api.saveCycle(this.cycle).then(cycle => {
      this.cycle = cycle;
      this.routeConfig.navModel.setTitle(cycle.startDate);
      this.originalCycle = JSON.parse(JSON.stringify(cycle));
    });
  }

  // Cancel navigation away from this component if you wish.
  canDeactivate() {
    if (!_.isEqual(this.originalCycle, this.cycle)){
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

      if (!result) {
        this.ea.publish(new CycleViewed(this.cycle));
      }

      return result;
    }

    return true;
  }
}
