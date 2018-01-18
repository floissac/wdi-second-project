const mongoose   = require('mongoose');
const { dbURI } = require('../config/environment');

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Rapper = require('../models/rapper');
const User = require('../models/user');

Rapper.collection.drop();
User.collection.drop();

User
  .create([
    {
      username: 'WillFlo',
      email: 'Flo@gmail.com',
      password: 'password',
      passwordConfirmation: 'password'
    },
    {
      username: '11-1',
      email: '11@1.com',
      password: 'password',
      passwordConfirmation: 'password'
    },
    {
      username: 'rgowan',
      email: 'rane@ga.com',
      password: 'password',
      passwordConfirmation: 'password'
    }
  ])
  .then(users => {
    console.log(`${users.length} users were created`);

    return Rapper.create([
      {
        name: 'Coolio',
        image: 'https://www.thefamouspeople.com/profiles/images/coolio-4.jpg',
        tracks: [
          {
            trackId: 'https://www.youtube.com/embed/N6voHeEa3ig',
            caption: 'this is a siiiiiiiiick tune bruva',
            createdBy: users[0].id,
            comments: [
              {
                content: 'sick.',
                createdBy: users[1].id
              }
            ]
          }
        ]
      }
    ])
      .then(rappers => {
        console.log(`${rappers.length} rappers were created.`);
      })
      .catch((err) =>  console.log(err))
      .finally(() =>  mongoose.connection.close());
  });


//
// User
//   .create([{
//     username: 'WillFlo',
//     email: 'Flo@gmail.com',
//     password: 'password',
//     passwordConfirmation: 'password'
//   }])
//   .then((users) => {
//     console.log(`${users.length} users created`);
//     return Rapper
//       .create([{
//         name: '',
//         image: '',
//         createdBy: users[0]
//       },{
//         name: '',
//         image: '',
//         createdBy: users[0]
//       },{
//         name: '',
//         image: '',
//         createdBy: users[0]
//
//       },{
//         name: '',
//         image: '',
//         createdBy: users[0]
//
//       },{
//         name: '',
//         image: '',
//         createdBy: users[0]
//
//       },{
//         name: '',
//         image: '',
//         createdBy: users[0]
//       }]);
//   })
// .then((rappers) => console.log(`${rappers.length} rappers created!`))
// .catch((err) =>  console.log(err))
// .finally(() =>  mongoose.connection.close());
