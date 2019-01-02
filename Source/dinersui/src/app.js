import {inject, PLATFORM} from 'aurelia-framework';
import {WebAPI} from './web-api';

@inject(WebAPI)
export class App {
  constructor(api) {
    this.api = api;
  }
  
  configureRouter(config, router){
    config.title = 'Diners';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      //{ route: '',              moduleId: PLATFORM.moduleName('no-selection'),   title: 'Select' },
      { route: 'cycle', moduleId: PLATFORM.moduleName('cycle-detail'),   name: 'cycle', nav:true},
      { route: 'cycle/:id',  moduleId: PLATFORM.moduleName('cycle-detail'), name:'cycles' },
      { route: 'cycle/active',  moduleId: PLATFORM.moduleName('cycle-active'), name:'cycle' }
    ]);

    this.router = router;
  }
}
