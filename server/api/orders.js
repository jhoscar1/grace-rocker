const router = require('express').Router();
const Order = require('../db').model('order');
const Product = require('../db').model('product');
const Product_Order = require
const gatekeeper = require('../utils/gatekeeper');
const _ = require('lodash')

router.param('id', (req, res, next, id) => {
    Order.findById(id, {
        include: [Product]
    })
    .then(order => {
        if (!order) throw new Error(`No Order with ID: ${id} found`)
        req.order = order;
        next();
    })
    .catch(next);
});

router.get('/', gatekeeper.isAdmin, (req, res, next) => {
    Order.findAll({order: [['id', 'ASC']]})
    .then(foundOrders => {
        res.json(foundOrders);
    })
    .catch(next);
});

router.get('/user/:userId', gatekeeper.isAdminOrSelf, (req, res, next) => {
    Order.findAll({
      where: {
        userId: +req.params.userId
      },
      include: [Product]
    })
    .then(ordersArr => {
      res.json(ordersArr);
    })
    .catch(next);
});

// **TODO**
router.get('/:id', /*insert gatekeeper for self or admin */ (req, res, next) => {
    res.json(req.order);
});

router.post('/', (req, res, next) => {
    Order.create({
        status: 'created'
    })
    .then(createdOrder => {
        if (req.body.products){
            req.body.products.forEach(product => {
                createdOrder.addProduct(product.id, {
                    unit_quantity: product.quantity,
                    unit_price: product.priceInCents
                });
            });
        }
        if (req.user) {
            createdOrder.setUser(req.user);
        }
        res.sendStatus(201);
    });
});


router.put('/:id', gatekeeper.isAdminOrHasOrder, (req, res, next) => {
  // adding validation to the cart's products
  Order.findById(req.params.id, { include: {all: true}})
  .then(foundProductsArr => {
    return foundProductsArr.products;
  })
  .then(productInvArr => {
    // for each product in the order
    // find the corresponding product quantity available
    let badOrders = [];
    req.body.products.forEach(prodInOrder => {
      productInvArr.forEach(prodInInv => {
        // if these are the same product ids, compare quantities
        if(prodInOrder.id === prodInInv.id) {
          if(+prodInInv.stock < +prodInOrder.product_order.unit_quantity) {
            badOrders.push({
              product: prodInOrder.name,
              id: +prodInOrder.id,
              stock: +prodInInv.stock,
              unit_quantity: +prodInOrder.product_order.unit_quantity
            });
          }
        }
      });
    });
    return badOrders;
  })
  .then(badOrders => {
    if(!badOrders.length) {
      // If validation checks out, then decrement the available in stock in the database and change the status
      Promise.map(req.body.products, prodInOrder => {
        return prodInOrder.decStock(prodInOrder.product_order.unit_quantity);
      })
      .then((something) => {
        Order.findById(req.params.id);
      })
      .then(foundOrder => {
        return foundOrder.update(req.body);
      })
      .then(updatedOrder => {
        res.json(updatedOrder);
      })
      .catch(next);
    } else {
      // Send the array of bad orders
      let errStatement = '';
      badOrders.forEach(badOrder => {
        errStatement += ('Sorry, we do not have enough ' + badOrder.product + '. We only have ' + badOrder.stock + ' but you ordered ' + badOrder.unit_quantity + '. \n');
      });

      res.status(409).send(errStatement);
      return null;
    }
  })
  .catch(next);
});


router.delete('/:id', gatekeeper.isAdminOrHasOrder, (req, res, next) => {
    req.order.destroy()
    .then(() => {
        res.sendStatus(204);
    });
});

module.exports = router;
