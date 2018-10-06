let latency = 200;
let id = 0;

function getId(){
  return ++id;
}

let cycles = [
  {
    id:getId(),
    startDate: new Date(),
    endDate:new Date(),
    buckets: [{name:'bucket1'}],
    budget: 1000,
    savingsTarget:100
  },
  {
    id:getId(),
    startDate: new Date(),
    endDate:new Date(),
    buckets: [{name:'bucket1'}],
    budget: 1000,
    savingsTarget:100
  },
  {
    id:getId(),
    startDate: new Date(),
    endDate:new Date(),
    buckets: [{name:'bucket1'}],
    budget: 1000,
    savingsTarget:100
  },
  {
    id:getId(),
    startDate: new Date(),
    endDate:new Date(),
    buckets: [{name:'bucket1'}],
    budget: 1000,
    savingsTarget:100
  },
  {
    id:getId(),
    startDate: new Date(),
    endDate:new Date(),
    buckets: [{name:'bucket1'}],
    budget: 1000,
    savingsTarget:100
  }
];

export class WebAPI {
  isRequesting = false;
  
  getCycleList(){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = cycles.map(x =>  { return {
          id: x.id,
          startDate: x.startDate,
          endDate: x.endDate,
          buckets: x.buckets,
          budget: x.budget,
          savingsTarget: x.savingsTarget
        }});
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getCycleDetails(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = cycles.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  saveCycle(cycle){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(cycle));
        let found = cycle.filter(x => x.id == cycle.id)[0];

        if(found){
          let index = cycles.indexOf(found);
          cycles[index] = instance;
        }else{
          instance.id = getId();
          cycles.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }
}
