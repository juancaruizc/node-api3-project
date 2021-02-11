const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const Posts = require('./posts-model');

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE POSTS
  Posts.get(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ message: 'error retrieving posts' });
    });
});

router.get('/:id', middleware.validatePost, (req, res) => {
  // RETURN THE POST OBJECT
  // this needs a middleware to verify post id
  res.status(200).json(req.post);
});

// do not forget to export the router

module.exports = router;
