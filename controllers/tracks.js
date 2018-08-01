const Rapper = require('../models/rapper');


function showTrackRoute(req, res, next) {
  Rapper
    .findById(req.params.id)
    .populate('createdBy tracks.createdBy tracks.comments.createdBy')
    .exec()
    .then(rapper => {
      const track = rapper.tracks.id(req.params.trackId);

      return res.render('tracks/show', { track, rapper });
    })
    .catch(next);
}

function createTrackRoute(req, res, next) {
  req.body.createdBy = req.user;

  Rapper
    .findById(req.params.id)
    .exec()
    .then((rapper) => {
      if(!rapper) return res.notFound();

      rapper.tracks.push(req.body);
      return rapper.save();
    })
    .then((rapper) => {
      res.redirect(`/rappers/${rapper.id}`);
    })
    .catch(next);
}

// <----delete track---->

function deleteTrackRoute(req, res, next) {
  Rapper
    .findById(req.params.id)
    .exec()
    .then((rapper) => {
      if(!rapper) return res.notFound();

      const track = rapper.tracks.id(req.params.trackId);
      track.remove();

      return rapper.save();
    })
    .then((rapper) => {
      res.redirect(`/rappers/${rapper.id}`);
    })
    .catch(next);
}

module.exports = {
  create: createTrackRoute,
  show: showTrackRoute,
  delete: deleteTrackRoute
};
