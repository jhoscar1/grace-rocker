const db = require('../../server/db');
const Order = db.model('order');

const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest-as-promised');
const sinon = require('sinon');


describe('Order model', () => {

  beforeEach(() => {
    return db.sync({ force: true });
  });

  afterEach(function(){
    return db.sync({force: true});
  });


  describe('hooks', () => {

    describe('beforeCreate hook', () => {
      // I need to work on this spec...

      // it('will add a date to a newly created order', function() {
      //   return Order.create({
      //     status: "created"
      //   })
      //   .then(createdOrder => {
      //     let todaysDate = (new Date).toString().split(' ')
      //     // Could be a better solution here. Unfortunately, dates in Sequelize are different than those in usual JS : (
      //     let month  = todaysDate[1] + "e"
      //     let date = todaysDate[2]
      //     let year = todaysDate[3];
      //     let actualDate = month + ' ' + date + ', ' + year
      //     expect(createdOrder.purchase_date).to.be.equal(actualDate)
      //   })
      // })

    });
  });

  describe('enum property', () => {
    it('will not accept an unrecognized status', function() {
      Order.create({
        status: "not interested"
      })
      .then(result => {
        expect(result).to.be.an.instanceOf(Error)
      })
    })
  })
})
