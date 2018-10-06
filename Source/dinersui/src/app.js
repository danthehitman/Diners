import {inject, PLATFORM} from 'aurelia-framework';
import {WebAPI} from './web-api';

@inject(WebAPI)
export class App {
  constructor(api) {
    this.api = api;
  }
  
  configureRouter(config, router){
    config.title = 'Diners';
    config.map([
      { route: '',              moduleId: PLATFORM.moduleName('no-selection'),   title: 'Select' },
      { route: 'cycle/:id',  moduleId: PLATFORM.moduleName('cycle-detail'), name:'cycles' }
    ]);

    this.router = router;
  }
}
