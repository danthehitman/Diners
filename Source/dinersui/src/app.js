import {PLATFORM} from 'aurelia-pal';

export class App {
  configureRouter(config, router){
    config.title = 'Diners';
    config.map([
      { route: '',              moduleId: PLATFORM.moduleName('no-selection'),   title: 'Select' },
      { route: 'cycle/:id',  moduleId: PLATFORM.moduleName('cycle-detail'), name:'cycles' }
    ]);

    this.router = router;
  }
}
