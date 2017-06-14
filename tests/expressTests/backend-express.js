var supertest = require('supertest');
var secrets = require('../../secrets.js')
var app = require('../../server');
var agent = supertest.agent(app);
var chai = require('chai');
var expect = chai.expect;
const db = require('../../server/db');
const Product = db.model('product');
const User = db.model('user');


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
                .get('/admin')
                .expect(200, done);
          });
      });

    describe('GET /cart/', function() {
        it('responds with 200', function(done) {
            agent
                .get('/cart')
                .expect(200, done);
          });
      });

    describe('GET /product/:id', function() {
        
        let productID;

        before(() => {
            Product.create({
                name: 'Magic',
                price: 1000
            })
            .then(createdProduct => {
                productID = createdProduct.id;
            });
        })

        it('responds with 200 and returns proper data', function(done) {
            agent
                .get('/products/1')
                .expect(200, done);
            });
            agent.get(`/products/${productID}`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.contain.a.thing.with('name', 'Magic');
                })
        });

    describe('GET /api/users', function() {
        it('responds with 401', function(done) {
            agent
                .get('/api/users')
                .expect(401, done);
          });
      });

    describe('GET /api/orders', function() {
        it('responds with 401 for unauthorized users', function(done) {
            agent
                .get('/api/orders')
                .expect(401, done);
          });
      });
    });

    describe('POST requests', function() {

        it('responds with 401 for unauthorized users', function() {
            return agent
                .post('/api/users/')
                .send({
                    name: "sam",
                    email: "email@emails.com",
                    password: "test",
                })
                .expect(401)
        });
    });

    describe('API Validation', function() {
        const authAgent = supertest.agent(app);
        before(() => {
            User.create({
                name: 'Jason',
                email: 'test@test.com',
                pass: 'yahoo',
                isAdmin: true
            })
            .then(() => {
                console.log('created');
            })

            agent.post('/auth/login')
            .send({email: 'test@test.com', pass: 'yahoo'})
            .end((error, res) => {
                if (error) throw error;
                authAgent.saveCookies(res);
            })
        })

        it('returns data for authorized users', function() {
            authAgent.get('/api/users')
            .expect(200);

            agent.get('/api/users')
            .expect(403);

        })
    })
});
