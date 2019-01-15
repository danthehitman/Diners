import { inject } from 'aurelia-framework';
import { WebAPI } from './web-api';
import moment from 'moment';

@inject(WebAPI)
export class CycleActive {
  constructor(api) {
    this.api = api;
  }

  // this is a framework lifecycle method that gets called right before the router activates this component.
  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.api.getActiveCycle().then(cycle => {
      if (cycle != null && cycle != undefined) {
        this.cycle = cycle;
        this.routeConfig.navModel.setTitle(cycle.startDate + " - " + cycle.endDate);
      }
      else {
        alert("No active cycle found.  Create one?");
      }
    });
  }

  get dateRange() {
    return moment(this.cycle.startDate).format("MM/DD/YYYY") + " - " + moment(this.cycle.endDate).format("MM/DD/YYYY");
  }

  summaryClicked() {
    alert("Summary");
  }

  newEntryClicked() {
    alert("New entry");
  }

  showNewEntry = true;
  tempdata = "";
  tempvalue= "";
}
