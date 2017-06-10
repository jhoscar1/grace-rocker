const db = require('../../server/db');
const Order = db.model('order');

const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest-as-promised');
const sinon = require('sinon');

describe('Sequelize Tests', () => {
  // clearing the database
  beforeEach('Synchronize and clear database', () => db.sync({force: true}));
  // creating unsaved instances to test
  let orderOne;
  beforeEach(function () {
    orderOne = Order.build({
      status: 'created'
    });
  });

  after('Synchronize and clear database', () => db.sync({force:true}));

  describe('Order Model', () => {
    it('has the expected schema definition', () => {
      expect(Order.attributes.purchase_date).to.be.an('object');
      expect(Order.attributes.status).to.be.an('object');
    });
  });

  describe('Validations', () => {
  it('only has 4 statuses: "created", "processing", "cancelled", "completed"', () => {
      const order = Order.build({status: 'hello'});
      return order.validate()
              .then(err => {
                console.log(err);
                expect(err).to.be.an('object');
              })
    });
  });
});
