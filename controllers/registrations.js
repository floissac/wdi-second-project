const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/new');
}
// <---Register>
function createRoute(req, res) {
  User
    .create(req.body)
    .then((user) => {
      req.flash('info', `Thanks for registering, ${user.username}! Please login`);
      res.redirect('/rappers');
    })

    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.status(400).render('registrations/new', { message: 'Incorrect login details'});
      }
      res.status(500).end();
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
