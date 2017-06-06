const router = require('express').Router();
const Order = require('../db').models.Order;
const Product = require('../db').models.Product;

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
    Order.findAll({
        include: [Product]
    })
    .then(foundOrders => {
        res.json(foundOrders);
        return null;
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
    req.order.update()
    .then(order => {
        order.addProduct(req.body.product)
        .then(order => {
            res.json(order);
        })
    })
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
    req.order.destroy()
    .then(() => {
        console.log('Order deleted');
        res.sendStatus(204);
    })
})

module.exports = router;