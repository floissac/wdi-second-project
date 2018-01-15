// const router = require('express').Router();

const express = require('express');
const router  = express.Router();
const rappers = require('../controllers/rappers');
const statics = require('../controllers/statics');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');

function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in playa 🧐');
      res.redirect('/login');
    });
  }

  return next();
}


router.route('/')
  .get(statics.index); // The homepage that displays a list of users

router.route('/register')
  .get(registrations.new) // the register form
  .post(registrations.create); // the submit of the register form

router.route('/login')
  .get(sessions.new) // the login form
  .post(sessions.create); // the submit of the login form

router.route('/logout')
  .get(sessions.delete);

router.route('/secret')
  .get(secureRoute, statics.secret);


router.get('/', (req, res) => res.render('index'));

router.route('/rappers')
  .get(secureRoute, rappers.index)
  .post(secureRoute, rappers.create);

router.route('/rappers/new')
  .get(secureRoute, rappers.new);

router.route('/rappers/:id')
  .get(secureRoute, rappers.show)
  .put(rappers.update)
  .delete(rappers.delete);

router.route('/rappers/:id/edit')
  .get(secureRoute, rappers.edit);

module.exports = router;
