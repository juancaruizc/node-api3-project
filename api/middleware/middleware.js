const e = require('express');
const Post = require('../posts/posts-model');
const User = require('../users/users-model');

function logger(req, res, next) {
  // do your magic!
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );
  next();
}

const validateUserId = async (req, res, next) => {
  // do your magic!
  const { id } = req.params;

  try {
    const user = await User.getById(id);
    if (!user) {
      res.status(404).json({ message: 'user not found' });
    } else {
      req.user = user;
      next();
    }
  } catch (e) {
    res.status(500).json({ message: `Server error ${e}` });
  }
};

function validateUser(req, res, next) {
  // do your magic!
  const user = req.body;
  const name = req.body.name;
  if (!user) {
    res.status(400).json({ message: 'missing user data' });
  } else if (!name) {
    res.status(400).json({ message: 'missing required name field' });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const post = req.body;
  const text = req.body.text;
  if (!post) {
    res.status(400).json({ message: 'missing post data' });
  } else if (!text) {
    res.status(400).json({ message: 'missing required text field' });
  } else {
    next();
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
