import {computedFrom} from 'aurelia-framework';

export class Cycle {
  constructor(){
  }  

  @computedFrom('budget', 'savingsTarget')
  get flex() {
    return "this is a test";
  }
}
