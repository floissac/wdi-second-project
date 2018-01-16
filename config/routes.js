// const router = require('express').Router();

const express = require('express');
const router  = express.Router();
const rappers = require('../controllers/rappers');
// const statics = require('../controllers/statics');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');

router.get('/', (req, res) => res.render('index', { isHomepage: true }));

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

router.route('/rappers/:id/comments')
  .post(rappers.createComment);

router.route('/rappers/:id/comments/:commentId')
  .delete(rappers.deleteComment);

router.route('/register')
  .get(registrations.new) // the register form
  .post(registrations.create); // the submit of the register form

router.route('/login')
  .get(sessions.new) // the login form
  .post(sessions.create); // the submit of the login form

router.route('/logout')
  .get(sessions.delete);

router.route('/secret')
  .get(secureRoute, rappers.secret);

module.exports = router;
