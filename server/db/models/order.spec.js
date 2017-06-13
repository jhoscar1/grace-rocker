const { expect } = require('chai');
const db = require('../db');
const Order = db.model('user');

describe('Order model', () => {

  beforeEach(() => {
    return db.sync({ force: true });
  });

  afterEach(function(){
    return db.sync({force: true});
  });


  describe('hooks', () => {

    describe('beforeCreate hook', () => {

      it('will add a date to a newly created order', function() {
        return Order.create({
          status: "created"
        })
        .then(createdOrder => {
          expect(createdOrder.purchase_date).to.be.closeTo(Date.now(), 10)
        })
      })

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

//
//
//
//       let cody;
//
//       beforeEach(() => {
//         return User.create({
//           email: 'cody@puppybook.com',
//           password: 'bones'
//         })
//           .then(user => {
//             cody = user;
//           });
//       });
//
//       it('returns true if the password is correct', () => {
//         expect(cody.correctPassword('bones')).to.be.equal(true);
//       });
//
//       it('returns false if the password is incorrect', () => {
//         expect(cody.correctPassword('bonez')).to.be.equal(false);
//       });
//
//     }); // end describe('correctPassword')
//
//   }); // end describe('instanceMethods')
//
// }); // end describe('User model')
