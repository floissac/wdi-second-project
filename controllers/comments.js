const Rapper = require('../models/rapper');

function createCommentRoute(req, res, next) {
  req.body.createdBy = req.user;
  console.log(req.user);

  Rapper
    .findById(req.params.id)
    .populate('createdBy tracks.createdBy tracks.comments.createdBy')
    .exec()
    .then((rapper) => {
      console.log(rapper);
      if(!rapper) return res.notFound();

      const track = rapper.tracks.id(req.params.trackId);
      track.comments.push(req.body);

      return rapper.save();
    })
    .then(() => {
      res.redirect(`/rappers/${req.params.id}/tracks/${req.params.trackId}`);
    })
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Rapper
    .findById(req.params.id)
    .exec()
    .then((rapper) => {
      if(!rapper) return res.notFound();

      const track = rapper.tracks.id(req.params.trackId);
      const comment = track.comments.id(req.params.commentId);
      comment.remove();

      return rapper.save();
    })
    .then(() => {
      res.redirect(`/rappers/${req.params.id}/tracks/${req.params.trackId}`);
    })
    .catch(next);
}

module.exports = {
  create: createCommentRoute,
  delete: deleteCommentRoute
};
