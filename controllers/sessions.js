const User = require('../models/user');

function newRoute(req, res) {
  res.render('sessions/new');
}
function createRoute(req, res) {
  User
    .findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).render('sessions/new', { message: 'Unrecognised credentials 🤷🏻‍' });
      }

      req.session.userId = user.id;
      req.flash('info', `Welcome, ${user.username}! `);
      res.redirect('/rappers');
    })
    .catch(() => {
      res.status(500).end();
    });
}

function deleteRoute(req, res) {
  return req.session.regenerate(() => {
    res.redirect('/');
  });
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
