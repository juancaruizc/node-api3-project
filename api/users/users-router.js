const express = require('express');
const middleware = require('../middleware/middleware');
const Users = require('./users-model');
const Posts = require('../posts/posts-router');

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({ message: 'error retrieving users' });
    });
});

router.get('/:id', middleware.validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user);
});

router.post('/', middleware.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(() => {
      res.status(500).json({ message: 'error adding user' });
    });
});

router.put(
  '/:id',
  middleware.validateUser,
  middleware.validateUserId,
  (req, res) => {
    // RETURN THE FRESHLY UPDATED USER OBJECT
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    Users.update(req.params.id, req.body)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch(() => {
        res.status(500).json({ message: 'error updating user' });
      });
  }
);

router.delete('/:id', middleware.validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'user deleted' });
    })
    .catch(() => {
      res.status(500).json({ message: 'error' });
    });
});

router.get('/:id/posts', middleware.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ message: 'error retrieving user posts' });
    });
});

router.post(
  '/:id/posts',
  middleware.validateUserId,
  middleware.validatePost,
  (req, res) => {
    // RETURN THE NEWLY CREATED USER POST
    // this needs a middleware to verify user id
    // and another middleware to check that the request body is valid
    const postInfo = { ...req.body, user_id: req.params.id };
    Posts.insert(postInfo)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch(() => {
        res.status(500).json({ message: 'error posting post' });
      });
  }
);

// do not forget to export the router

module.exports = router;
