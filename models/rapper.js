const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  return this.createdBy.id === user.id;
};

const trackSchema = new mongoose.Schema({
  trackId: { type: String, required: true },
  caption: { type: String, required: true },
  comments: [ commentSchema ],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
}, {
  timestamps: true
});

const rapperSchema = new mongoose.Schema({
  name: { type: String},
  image: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
  tracks: [ trackSchema ]
});

rapperSchema.methods.belongsTo = function belongsTo(user) {
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('Rapper', rapperSchema);
