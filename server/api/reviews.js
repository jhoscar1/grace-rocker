const router = require('express').Router();
const Review = require('../db').model('review');
const Product = require('../db').model('product');

router.param('id', (req, res, next, id) => {
    Review.findById(id)
    .then(foundReview => {
        if (!foundReview) {
            const err = new Error(`No review with id: ${id} found`);
            err.status = 404;
            throw err;
        }
        req.review = foundReview;
        next();
        return null;
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
    Review.findAll()
    .then(foundReviews => {
        if (!foundReviews) {
            const err = new Error(`No reviews found`);
            err.status = 404;
            throw err;
        }
        res.json(foundReviews);
    })
    .catch(next)
})

router.get('/products/:productId/reviews/:id', (req, res, next) => {
    res.json(req.review);
})

router.post('/products/:productId/reviews', (req, res, next) => {
    console.log(req.body);
    console.log(req.user);
    Review.create({
        title: req.body.title,
        body: req.body.body,
        stars: req.body.stars
    })
    .then(createdReview => {
        return createdReview.setUser(req.user)
    })
    .then(reviewWithUser => {
        return reviewWithUser.setProduct(req.params.productId)
    })
    .then((fullReview) => {
        res.status(201).send(fullReview);
    })
    .catch(next);
})

router.put('/products/:productId/reviews/:id', (req, res, next) => {
    req.review.update({
        body: req.body.body,
        stars: req.body.stars
    })
    .then(updatedReview => {
        res.status(201).send(updatedReview);
    })
    .catch(next);
})

router.delete('/products/:productId/reviews/:id', (req, res, next) => {
    req.review.destroy()
    .then(() => res.sendStatus(204))
    .catch(next);
})

module.exports = router;
