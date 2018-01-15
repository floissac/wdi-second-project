const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const databaseURL = 'mongodb://localhost/express-authentication';
mongoose.connect(databaseURL);

const Rapper = require('../models/rapper');

Rapper.collection.drop();

Rapper
  .create([{
    name: '',
    image: ''
  },{
    name: '',
    image: ''
  },{
    name: '',
    image: '',
    bio: ''
  },{
    name: '',
    image: '',
    bio: ''
  },{
    name: '',
    image: '',
    bio: ''
  },{
    name: '',
    image: '',
    bio: ''
  }])
  .then((rappers) => {
    console.log(`${rappers.length} rappers created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
