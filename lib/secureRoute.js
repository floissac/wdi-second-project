function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in playa 🧐');
      res.redirect('/login');
    });
  }

  return next();
}

module.exports = secureRoute;
