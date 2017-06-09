const router = require('express').Router();
const Order = require('../db').model('order');
const Product = require('../db').model('product')

router.param('id', (req, res, next, id) => {
    Order.findById(id)
    .then(order => {
        if (!order) throw new Error(`No Order with ID: ${id} found`)
        req.order = order;
        next();
    })
    .catch(next);
})

router.get('/', (req, res, next) => {
    Order.findAll({order: [['id', 'ASC']]})
    .then(foundOrders => {
        res.json(foundOrders);
    })
    .catch(next);
})

// router.get('/sorted/:displayOrder', (req, res, next) => {
//     let order = req.params.displayOrder
//     Order.findAll({order: [[order, 'ASC']]})
//     .then(foundOrders => {
//         res.json(foundOrders);
//     })
//     .catch(next);
//   }
// )

router.get('/user/:userId', (req, res, next) => {
    Order.findAll({
      where: {
        userId: +req.params.userId
      },
      include: [Product]
    })
    .then(ordersArr => {
      res.json(ordersArr)
    })
    .catch(next);
})

router.get('/:id', (req, res, next) => {
    res.json(req.order);
})

router.post('/', (req, res, next) => {
    Order.create({
        status: 'created'
    })
    .then(createdOrder => {
        req.body.products.forEach(product => {
            createdOrder.addProduct(product, {
                unit_quantity: req.body.product.quantity,
                unit_price: req.body.product.price
            });
            if (req.user) {
                createdOrder.setUser(req.user)
            }
        })
    })
})

router.put('/:id', (req, res, next) => {
  Order.findById(req.params.id)
  .then(foundOrder => {
    return foundOrder.update(req.body)
  })
  .then(updatedOrder => res.json(updatedOrder))
})

router.delete('/:id', (req, res, next) => {
    req.order.destroy()
    .then(() => {
        res.sendStatus(204);
    })
})

module.exports = router;

// router.put('/:id', (req, res, next) => {
//   Order.findById(req.params.id)
//   .then(foundOrder => {
//     return foundOrder.update(req.body)
//   })
//   .then(updatedOrder => res.json(updatedOrder))
// })
