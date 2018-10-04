import {computedFrom} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {WebAPI} from './web-api';
import {areEqual} from './utility';

@inject(WebAPI)
export class CycleDetail {
  constructor(api){
    this.api = api;
  }

  // this is a framework lifecycle method that gets called right before the router activates this component.
  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.api.getCycleDetails(params.id).then(cycle => {
      this.cycle = cycle;
      this.routeConfig.navModel.setTitle(cycle.startDate);
      this.originalCycle = JSON.parse(JSON.stringify(cycle));
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
    if (!areEqual(this.originalCycle, this.cycle)){
      return confirm('You have unsaved changes. Are you sure you wish to leave?');
    }

    return true;
  }
}
