const User = require('../models/user');

function sessionsNew(req, res) {
  res.render('sessions/new');
}
function sessionsCreate(req, res) {
  User
    .findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).render('sessions/new', { message: 'Unrecognised credentials 🤷🏻‍' });
      }

      req.session.userId = user.id;
      req.user = user;

      req.flash('info', `Welcome, ${user.username}! `);
      res.redirect('/rappers');
    })
    .catch(() => {
      res.status(500).end();
    });
}

function sessionsDelete(req, res) {
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete
};
