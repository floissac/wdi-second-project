const mongoose   = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Rapper = require('../models/rapper');
const User = require('../models/user');

Rapper.collection.drop();
User.collection.drop();


User
  .create([{
    username: 'WillFlo',
    email: 'Flo@gmail.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Rapper
      .create([{
        name: '',
        image: '',
        createdBy: users[0]
      },{
        name: '',
        image: '',
        createdBy: users[0]
      },{
        name: '',
        image: '',
        createdBy: users[0]

      },{
        name: '',
        image: '',
        createdBy: users[0]

      },{
        name: '',
        image: '',
        createdBy: users[0]

      },{
        name: '',
        image: '',
        createdBy: users[0]
      }]);
  })
  .then((rappers) => console.log(`${rappers.length} rappers created!`))
  .catch((err) =>  console.log(err))
  .finally(() =>  mongoose.connection.close());
