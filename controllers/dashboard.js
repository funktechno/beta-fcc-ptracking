'use strict';

const logger = require('../utils/logger');
// switch playliststore for mongo
const Challenge = require('../model/Challenge.js');

const mongoose = require('mongoose');
// Mongoose configuration
mongoose.Promise = global.Promise;
mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_DOMAIN}/${process.env.DB_NAME}`,
    { useMongoClient: true }
)

const dashboard = {
  index : async (request, response) => {
    logger.info('dashboard rendering'); 
    var viewData = {
      title: 'Challenge List Dashboard',
      challenges: await Challenge.find()
    };
    logger.info('about to render', viewData);
    response.render('dashboard', viewData);
  },
  export : async (request, response) => {
    logger.info('export rendering'); 
    var viewData = {
      challenges: await Challenge.find()
    };
    logger.info('about to render', viewData);
    response.json(viewData.challenges.map(item => item.toObject()));
  },
  deleteChallenge: async(request, response) => {
    const deleteId = request.params.id;
    logger.debug(`Deleting Challenge ${deleteId}`);
    if(deleteId){
    Challenge.findByIdAndRemove(deleteId).then(async () => {
            response.status(204);
            response.redirect('/dashboard');
          })
        } else {
          response.status(400);
          response.send("An error occurred");
    }
  },
   addChallenge: async (request, response) => {
     if(request.body.title) {
       
      var challenge = new Challenge({
             title: request.body.title
          });
      if(request.body.genre)
         challenge.genre=request.body.genre
      if(request.body.section)
        challenge.section=request.body.section
       
        challenge.save().then(async () => {
            response.status(201);
            response.redirect('/dashboard');
          })
        } else {
          response.status(400);
          response.send("An error occurred");
      }
   }

};

module.exports = dashboard;
