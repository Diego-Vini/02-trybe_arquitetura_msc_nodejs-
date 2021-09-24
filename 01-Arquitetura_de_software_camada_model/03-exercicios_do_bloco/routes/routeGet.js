const router = require('express').Router();
const queryUsers = require('../models/userQuery')

router.get('/user', async (req, res) => {
  const users = await queryUsers();

  res.status(200).json(users);
});

module.exports = router;