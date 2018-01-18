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
      username: 'Trilliam',
      email: 'flo@ga.co',
      password: 'pla',
      passwordConfirmation: 'pla'
    },
    {
      username: 'Classic Dave',
      email: '11@1.com',
      password: 'password',
      passwordConfirmation: 'password'
    },
    {
      username: 'Rgowan',
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
      }, {
        name: 'Denzel Curry',
        image: 'https://i.scdn.co/image/cc617e10a9dd37d8ac4b55239744b46c3ee04280',
        tracks: [
          {
            trackId: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/108516846&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true',
            caption: 'one of his best songs',
            createdBy: users[2].id
          }
        ]
      }, {
        name: 'Vince Staples',
        image: 'https://i.scdn.co/image/cc617e10a9dd37d8ac4b55239744b46c3ee04280',
        tracks: [
          {
            trackId: 'https://www.youtube.com/embed/5OAYMMod9Wo',
            caption: 'this one is str8 fire',
            createdBy: users[0].id,
            comments: [
              {
                content: 'yeah its a really good song.',
                createdBy: users[1].id
              }
            ]
          }
        ]
      }, {
        name: 'J.I.D',
        image: 'https://ssli.ulximg.com/image/740x493/gallery/1489010536_0c2e4f4f65e5cd3ed00869512a3d7e83.jpg/5994b67a50cc0d2ee587b573a8baa3ae/1489010536_3f1ba61d17ecae3e4441e632d60c2742.jpg',
        tracks: [
          {
            trackId: 'https://www.youtube.com/embed/6eFcSesrP6A',
            caption: 'tooo good man!',
            createdBy: users[2].id,
            comments: [
              {
                content: 'yeah its a really good song.',
                createdBy: users[0].id
              }
            ]
          }
        ]
      }, {
        name: 'ASAP Ferg',
        image: 'https://static.vibe.com/files/2015/10/asap-ferg-640x640.jpg',
        tracks: [
          {
            trackId: 'https://www.youtube.com/embed/meXPbvp3ldg',
            caption: 'flmaes!',
            createdBy: users[0].id,
            comments: [
              {
                content: 'init fam such a banger!',
                createdBy: users[2].id
              }
            ]
          }
        ]
      }, {
        name: 'Rich Brian, AKA Rich Chigga',
        image: 'https://exclaim.ca//images/AmenArt.jpg',
        tracks: [
          {
            trackId: 'https://www.youtube.com/embed/adDD43CvrUc',
            caption: 'dope af',
            createdBy: users[2].id,
            comments: [
              {
                content: 'lol is this guy real',
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
