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
      status: 'cancelled'
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
    it('returns a default value of "created" if no status is given', () => {
      const fakeOrder = Order.build()
      expect(fakeOrder.status).to.be.equal('created');
    });

    it('returns the status of a given order', () => {
      expect(orderOne.status).to.be.equal('cancelled');
    });

    // cannot "get" the purchase date as the method used in sequelize getter for purchase date produces an error
    it('sets the purchase date to the current date when the order is created', (done) => {
      const fakeOrder = Order.create();
      done();
      expect(fakeOrder.getDataValue("purchase_date")).to.be.equal("June 10 2017");
    });
  });
});
