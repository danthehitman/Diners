import { HttpClient } from 'aurelia-fetch-client';

let latency = 200;
let id = 0;

function getId() {
  return ++id;
}

let cycles = [
  {
    id: getId(),
    startDate: new Date(),
    endDate: new Date(),
    buckets: [{ name: 'bucket1', target: 100, used: 10 }],
    budget: 1000,
    savingsTarget: 100
  },
  {
    id: getId(),
    startDate: new Date(),
    endDate: new Date(),
    buckets: [{ name: 'bucket1', target: 100, used: 10 }],
    budget: 1000,
    savingsTarget: 100
  },
  {
    id: getId(),
    startDate: new Date(),
    endDate: new Date(),
    buckets: [{ name: 'bucket1', target: 100, used: 10 }],
    budget: 1000,
    savingsTarget: 100
  },
  {
    id: getId(),
    startDate: new Date(),
    endDate: new Date(),
    buckets: [{ name: 'bucket1', target: 100, used: 10 }],
    budget: 1000,
    savingsTarget: 100
  },
  {
    id: getId(),
    startDate: new Date(),
    endDate: new Date(),
    buckets: [{ name: 'bucket1', target: 100, used: 10 }],
    budget: 1000,
    savingsTarget: 100
  }
];

export class WebAPI {
  isRequesting = false;

  constructor() {
    this.httpClient = new HttpClient();

    this.httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://localhost:44316/api/')
        .withDefaults({
          // credentials: 'same-origin',
          headers: {
            'X-Requested-With': 'Fetch'
          }
        })
      // .withInterceptor({
      //   request(request) {
      //     let authHeader = fakeAuthService.getAuthHeaderValue(request.url);
      //     request.headers.append('Authorization', authHeader);
      //     return request;
      //   }
      // });
    });
  }

  getCycleList() {
    this.isRequesting = true;
    return new Promise(resolve => {
      this.httpClient
        .fetch('cycles', {
          method: 'get'
        })
        .then(response => response.json())
        .then(cycles => {
          resolve(cycles);
          this.isRequesting = false;
        })
        .catch(error => {
          alert('Error getting cycles!');
          this.isRequesting = false;
        });
    });
  }

  getCycleDetails(id) {
    this.isRequesting = true;
    return new Promise(resolve => {
      this.httpClient
        .fetch('cycles/' + id, {
          method: 'get'
        })
        .then(response => response.json())
        .then(cycle => {
          resolve(cycle);
          this.isRequesting = false;
        })
        .catch(error => {
          alert('Error getting cycle!');
          this.isRequesting = false;
        });
    });
  }

  updateCycle(cycle) {
    this.isRequesting = true;
    return new Promise(resolve => {
      this.httpClient
        .fetch('cycles/' + cycle.id, {
          method: 'put',
          body: JSON.stringify(cycle)
        })
        .then(response => response.json())
        .then(savedCycle => {
          alert(`Saved comment! ID: ${savedCycle.id}`);
        })
        .catch(error => {
          alert('Error saving comment!');
        });
    });
  }
}
