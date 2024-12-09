// wykorzystanie metody GET
describe('GET request to httpbin', () => {
    it('should return a successful response', () => {
        cy.request('GET', 'https://httpbin.org/get')
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('args');
                expect(response.body).to.have.property('headers');
                expect(response.body).to.have.property('origin');
                expect(response.body).to.have.property('url');
            });
    });
});

// wykorzystanie metody POST
describe('Test POST request to httpbin', () => {
    it('should send a POST request and receive a valid response', () => {
      cy.request({
        method: 'POST', 
        url: 'https://httpbin.org/post', 
        body: {
          key: 'value' 
        }
      }).then((response) => {
        
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('json'); 
        expect(response.body.json).to.have.property('key', 'value'); 
      });
    });
  });

  //wykorzystanie metody PUT
  describe('PUT request test', () => {
    it('should successfully send a PUT request', () => {
        const requestData = {
            name: 'John Doe',
            age: 30
        };

        cy.request({
            method: 'PUT',
            url: 'https://httpbin.org/put',
            body: requestData
        }).then((response) => {
            
            expect(response.status).to.eq(200);
            expect(response.body.json).to.deep.equal(requestData); 
        });
    });
});

//wykorzystanie metody DELETE
describe('Test API DELETE', () => {
    it('should successfully delete a resource', () => {
      
      cy.request('DELETE', 'https://httpbin.org/delete')
        .then((response) => {
          
          expect(response.status).to.eq(200);
          
          expect(response.body).to.have.property('url', 'https://httpbin.org/delete');
        });
    });
  });

  //wykorzystanie metody GET do nagłówków User-Agent
  describe('Test API GET request', () => {
    it('should send a GET request and check the User-Agent header', () => {
        
        const customUserAgent = 'MyCustomUserAgent/1.0';

        cy.request({
            method: 'GET',
            url: 'https://httpbin.org/get',
            headers: {
                'User-Agent': customUserAgent
            }
        }).then((response) => {
            
            expect(response.status).to.eq(200);

            expect(response.body).to.have.property('headers');
            expect(response.body.headers).to.have.property('User-Agent', customUserAgent);
        });
    });
});

//wykorzystanie metody GET do nagłówków niestandardowych
describe('Test GET request with custom headers', () => {
    it('should send GET request with custom headers and validate response', () => {
        const customHeaders = {
            'X-Custom-Header': 'CustomValue',
            'Another-Header': 'AnotherValue'
        };

        cy.request({
            method: 'GET',
            url: 'https://httpbin.org/get',
            headers: customHeaders
        }).then((response) => {
            
            expect(response.status).to.eq(200); 
            expect(response.headers['content-type']).to.include('application/json'); 

            expect(response.body.headers).to.have.property('X-Custom-Header', 'CustomValue');
            expect(response.body.headers).to.have.property('Another-Header', 'AnotherValue');
        });
    });
});

//wykorzystanie metody GET do wysyłania parametrów zapytania
describe('Test GET Request with Query Parameters', () => {
    it('should send a GET request with query parameters', () => {
    
      const queryParams = {
        name: 'John Doe',
        age: 30
      };
  
      cy.request({
        method: 'GET',
        url: 'https://httpbin.org/get',
        qs: queryParams 
      }).then((response) => {
        
        expect(response.status).to.eq(200);
        
        expect(response.body.args).to.have.property('name', 'John Doe');
        expect(response.body.args).to.have.property('age', '30'); 
      });
    });
  });

  //wykorzystanie metody GET do generowania losowych parametrów zapytania
  describe('GET request to httpbin with random query parameters', () => {
    it('should send a GET request and pass the test', () => {

        const randomParam1 = Math.random().toString(36).substring(2, 7);
        const randomParam2 = Math.random().toString(36).substring(2, 7);

        const url = `https://httpbin.org/get?param1=${randomParam1}&param2=${randomParam2}`;

        cy.request(url).then((response) => {
            
            expect(response.status).to.eq(200);
            expect(response.body.args.param1).to.eq(randomParam1);
            expect(response.body.args.param2).to.eq(randomParam2);
        });
    });
});

//wykorzystanie metody GET do sprawdzenia treści odpowiedzi
describe('Test API GET', () => {
    it('should return expected response from https://httpbin.org/get', () => {
        
        cy.request('GET', 'https://httpbin.org/get')
            .then((response) => {
                
                expect(response.status).to.eq(200);
                
                expect(response.body).to.have.property('url', 'https://httpbin.org/get');

            });
    });
});

//wykorzystanie metody GET do sprawdzania czasu trwania wniosku
describe('Test API GET request', () => {
    it('should make a GET request and check the duration', () => {
        const startTime = performance.now(); 
        cy.request('GET', 'https://httpbin.org/get').then((response) => {
            const endTime = performance.now(); 
            const duration = endTime - startTime; 
            
            expect(response.status).to.eq(200);

            expect(duration).to.be.lessThan(500);
        });
    });
});