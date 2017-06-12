const router = require('express').Router();
const Order = require('../db').model('order');
const Product = require('../db').model('product')
const gatekeeper = require('../utils/gatekeeper');

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
})

router.get('/', gatekeeper.isAdmin, (req, res, next) => {
    Order.findAll({order: [['id', 'ASC']]})
    .then(foundOrders => {
        res.json(foundOrders);
    })
    .catch(next);
})

router.get('/user/:userId', gatekeeper.isAdminOrSelf, (req, res, next) => {
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

// **TODO**
router.get('/:id', /*insert gatekeeper for self or admin */ (req, res, next) => {
    res.json(req.order);
})

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
            createdOrder.setUser(req.user)
        }
        res.sendStatus(201);
    })
});


router.put('/:id', gatekeeper.isAdminOrHasOrder, (req, res, next) => {
  Order.findById(req.params.id)
    .then(foundOrder => {
        if (foundOrder.id === req.session.order && req.body.status === 'processing') {
            delete req.session.order;
        }
        return foundOrder.update(req.body)
    })
    .then(updatedOrder => res.json(updatedOrder))
})

router.delete('/:id', gatekeeper.isAdminOrHasOrder, (req, res, next) => {
    req.order.destroy()
    .then(() => {
        res.sendStatus(204);
    })
})

module.exports = router;
