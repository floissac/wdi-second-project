const User = require('../models/user');

function usersIndexRoute(req, res) {
  User
    .find()
    .exec()
    .then((users) => {
      if(!users) return res.status(404).send('Not found');
      res.render('users/index', { users });
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

module.exports = {
  index: usersIndexRoute
};
