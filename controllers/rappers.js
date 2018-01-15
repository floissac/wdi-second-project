const Rapper = require('../models/rapper');

//Index

function rappersIndex(req, res) {
  Rapper
    .find()
    .exec()
    .then((rappers) => {
      res.render('rappers/index', { rappers });
    })
    .catch((err) => {
      res.status(500).render('error', {err});
    });
}

//New
function rappersNew(req, res) {
  res.render('rappers/new');
}

//Show
function rappersShow(req, res) {
  Rapper
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then((rapper) => {
      if(!rapper) return res.status(404).send('Not found');
      res.render('rappers/show', { rapper });
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

//Create
function rappersCreate(req, res) {
  req.body.createdBy = req.user;

  Rapper
    .create(req.body)
    .then(() => {
      res.redirect('/rappers');
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

//Edit
function rappersEdit(req, res) {
  Rapper
    .findById(req.params.id)
    .exec()
    .then((rapper) => {
      if(!rapper) return res.status(404).send('Not found');
      res.render('rappers/edit', { rapper });
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

//Update
function rappersUpdate(req, res) {
  Rapper
    .findById(req.params.id)
    .exec()
    .then((rapper) => {
      if(!rapper) return res.status(404).send('Not found');

      rapper = Object.assign(rapper, req.body);
      return rapper.save();
    })
    .then((rapper) => {
      res.redirect(`/rappers/${rapper.id}`);
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

//Delete
function rappersDelete(req, res) {
  Rapper
    .findById(req.params.id)
    .exec()
    .then((rapper) => {
      if(!rapper) return res.status(404).send('Not found');

      return rapper.remove();
    })
    .then(() => {
      res.redirect('/rappers');
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function createCommentRoute(req, res, next) {
  req.body.createdBy = req.user;

  Rapper
    .findById(req.params.id)
    .exec()
    .then((rapper) => {
      if(!rapper) return res.notFound();

      rapper.comments.push(req.body);
      return rapper.save();
    })
    .then((rapper) => {
      res.redirect(`/rappers/${rapper.id}`);
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest(`/rappers/${req.params.id}`, err.toString());
      }
      next(err);
    });
}

function deleteCommentRoute(req, res, next) {
  Rapper
    .findById(req.params.id)
    .exec()
    .then((rapper) => {
      if(!rapper) return res.notFound();

      const comment = rapper.comments.id(req.params.commentId);
      comment.remove();

      return rapper.save();
    })
    .then((rapper) => {
      res.redirect(`/rappers/${rapper.id}`);
    })
    .catch(next);
}

module.exports = {
  index: rappersIndex,
  new: rappersNew,
  show: rappersShow,
  create: rappersCreate,
  edit: rappersEdit,
  update: rappersUpdate,
  delete: rappersDelete,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
