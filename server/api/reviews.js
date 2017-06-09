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

router.get('/:productId/reviews', (req, res, next) => {
    Review.findAll({
        where: {
            productId: req.params.productId
        }
    })
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

router.get('/:productId/reviews/:id', (req, res, next) => {
    res.json(req.review);
})

router.post('/:productId/reviews', (req, res, next) => {
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

router.put('/:productId/reviews/:id', (req, res, next) => {
    req.review.update({
        body: req.body.body,
        stars: req.body.stars
    })
    .then(updatedReview => {
        res.status(201).send(updatedReview);
    })
    .catch(next);
})

router.delete('/:productId/reviews/:id', (req, res, next) => {
    req.review.destroy()
    .then(() => res.sendStatus(204))
    .catch(next);
})

module.exports = router;
