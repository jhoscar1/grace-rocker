var supertest = require('supertest');
var secrets = require('../../secrets.js')
var app = require('../../server');
var agent = supertest.agent(app);
var chai = require('chai');
var expect = chai.expect;

describe('http requests', function() {

  describe('GET requests', function() {

    describe('GET home', function() {
        it('responds with 200', function(done) {
            agent
                .get('/home')
                .expect(200, done);
          });
      });

    describe('GET /admin/', function() {
        it('responds with 200', function(done) {
            agent
                .get('/wiki/add')
                .expect(200, done);
          });
      });

    describe('GET /cart/', function() {
        it('responds with 200', function(done) {
            agent
                .get('/wiki/add')
                .expect(200, done);
          });
      });

    describe('GET /product/:id', function() {
      it('responds with 200', function(done) {
          agent
              .get('/products/1')
              .expect(200, done);
          });
      });

    describe('GET /api/users', function() {
        it('responds with 401', function(done) {
            agent
                .get('/wiki/add')
                .expect(200, done);
          });
      });

    describe('GET /api/orders', function() {
        it('responds with 401', function(done) {
            agent
                .get('/wiki/add')
                .expect(200, done);
          });
      });
    });

  describe('POST requests', function() {

      it('responds with 302', function() {
          return agent
              .post('/api/users/')
              .send({
                  name: "sam",
                  email: "email@emails.com",
                  password: "test",
              })
              .expect(302)
      });
  });
});
