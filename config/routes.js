const express = require('express');
const router  = express.Router();
const rappers = require('../controllers/rappers');
const tracks = require('../controllers/tracks');
const comments = require('../controllers/comments');
const users   = require('../controllers/users');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');

router.get('/', (req, res) => res.render('index', { isHomepage: true }));

router.route('/users')
  .get(users.index);

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

router.route('/rappers/:id/tracks')
  .post(secureRoute, tracks.create);
router.route('/rappers/:id/tracks/:trackId')
  .get(secureRoute, tracks.show)
  .delete(secureRoute, tracks.delete);

router.route('/rappers/:id/tracks/:trackId/comments')
  .post(comments.create);
router.route('/rappers/:id/tracks/:trackId/comments/:commentId')
  .delete(comments.delete);

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
