import { HttpClient } from 'aurelia-fetch-client';

export class WebAPI {
  isRequesting = false;

  constructor() {
    this.httpClient = new HttpClient();

    this.httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://192.168.1.19:5001/api/')
        // .withBaseUrl('https://localhost:5001/api/')
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

  getActiveCycle() {
    this.isRequesting = true;

    return new Promise(resolve => {
      this.httpClient
        .fetch('cycles/active', {
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
        .then(savedCycle => {
          alert(`Saved cycle!`);
          this.isRequesting = false
          resolve();
        })
        .catch(error => {
          alert('Error saving comment!');
          this.isRequesting = false;
          reject("Error");
        });
    });
  }

  createCycle(cycle) {
    this.isRequesting = true;
    return new Promise(resolve => {
      this.httpClient
        .fetch('cycles/', {
          method: 'post',
          body: JSON.stringify(cycle)
        })
        .then(savedCycle => {
          alert(`Saved cycle!`);
          this.isRequesting = false
          resolve(savedCycle);
        })
        .catch(error => {
          alert('Error creating comment!');
          this.isRequesting = false;
          reject("Error");
        });
    });
  }
}
