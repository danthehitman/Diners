import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import 'whatwg-fetch';
import environment from './environment';
import { PLATFORM } from 'aurelia-pal';
import 'babel-polyfill';
import * as Bluebird from 'bluebird';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';
import 'aurelia-bootstrap-datetimepicker/dist/amd/bootstrap-datetimepicker-bs4.css';
import 'aurelia-bootstrap-select/dist/amd/bootstrap-select-bs4.css';


// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));
    
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap-datetimepicker'), config => {
      config.extra.bootstrapVersion = 4;
      config.extra.iconBase = 'font-awesome';
      config.options.format = 'MM-DD-YYYY';
      config.options.showTodayButton = true;
    });

    aurelia.use.plugin(PLATFORM.moduleName('aurelia-bootstrap-select'));

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
    
  }

  return aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
