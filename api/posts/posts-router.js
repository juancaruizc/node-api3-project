const express = require('express');
const {
  validateUserId,
  validatePost,
  // validateUserPostId,
} = require('../middleware/middleware');

const router = express.Router();

const Post = require('../users/users-model');
const UserPost = require('./posts-model');

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const { id } = req.params;
  Post.getUserPosts(id)
    .then((posts) => res.status(200).json(posts))
    .catch(next);
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const post = req.body;
  UserPost.insert(post)
    .then((newPost) => res.status(201).json(newPost))
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: 'something went terrible in the posts router',
  });
});

module.exports = router;
