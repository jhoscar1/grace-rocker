const router = require('express').Router();
const User = require('../db').model('user');
const gatekeeper = require('../utils/gatekeeper');
module.exports = router;

router.get('/', gatekeeper.isAdmin, (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next);
});


// find a single user
router.get('/:id', gatekeeper.isAdminOrSelf, (req, res, next) => {
    User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(foundUser => res.json(foundUser))
    .catch(next)
})


// create a single user
router.post('/', gatekeeper.isAdmin, (req, res, next) => {
  User.create(req.body)
  .then(createdUser => res.json(createdUser))
  .catch(next)
})

//update a user
// will need to worry about authentication stuff later, then update
router.put('/:id', gatekeeper.isAdmin, (req, res, next) => {
  User.findById(req.params.id)
  .then(foundUser => {
    // foundUser = Object.assign(foundUser, req.body)
    return foundUser.update(req.body)
    })
    .then(savedUser => res.json(savedUser))
})

router.delete('/:id', gatekeeper.isAdmin, (req, res, next) => {
  User.destroy({
    where: {id : req.params.id}
  })
  .then(() => res.sendStatus(204))
  }
)
