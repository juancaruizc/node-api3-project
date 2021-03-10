const express = require('express');
const { validateUserId, validateUser } = require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
const User = require('./users-model');

// The middleware functions also need to be required
const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then((users) => res.status(200).json(users))
    .catch(next);
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user);
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert(req.body)
    .then((user) => res.status(201).json(user))
    .catch(next);
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { id } = req.params;
  const changes = req.body;
  User.update(id, changes)
    .then((updatedUser) => res.status(200).json(updatedUser))
    .catch(next);
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params;
  User.remove(id)
    .then((deletedUser) => res.status(200).json(deletedUser))
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: 'something went terrible in the users router',
  });
});

// do not forget to export the router

module.exports = router;
