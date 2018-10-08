import {computedFrom} from 'aurelia-framework';

export class Cycle {
  constructor(){
  }

  static newCycle()
  {
    let cycle =  new Cycle();    
    cycle.id = "new";
    cycle.startDate = new Date();
    cycle.endDate = new Date();
    cycle.buckets = [];
    cycle.budget = 0;
    cycle.savingsTarget = 0;
    return cycle;
  }
}

export class Bucket {
  constructor(){
  }

  static newBucket()
  {
    let bucket =  new Bucket();    
    bucket.id = "new";
    bucket.name = new Date();
    bucket.target = 0;
    bucket.used = 0;
    return bucket;
  }
}
