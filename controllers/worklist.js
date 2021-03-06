'use strict';

const logger = require('../utils/logger');
const Challenge = require('../model/Challenge.js');

const mongoose = require('mongoose');
// Mongoose configuration
mongoose.Promise = global.Promise;
mongoose.connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_DOMAIN}/${process.env.DB_NAME}`,
    { useMongoClient: true }
)

const challengelist = {
  index: async (request, response) => {
    const challengeId = request.params.id;
    logger.debug('challengeId id = ', challengeId);
    var challenge = await Challenge.findById(challengeId);
    const viewData = {
      title: challenge.title,
      challenge
    };
    
    response.render('worklist', viewData);
  },

  deleteWork: async(request, response) => {

    const challengeId = request.params.id;
    const workId = request.params.workid;
    var challenge = await Challenge.findById(challengeId);
    logger.debug(`Deleting Work ${workId} from Challenge ${challengeId}`);
    
    if(workId && challenge){
      
      challenge.work.id(workId).remove();
      challenge.save().then(async () => {
            response.status(200);
            response.redirect('/challenge/' + challengeId);
          })
        } 
    else {
            response.status(400);
            response.send("An error occurred");
    }
    
    response.redirect('/challenge/' + challengeId);

  },
  
  addWork: async(request, response) => {
    const challengeId = request.params.id;
    if(request.body.title && (request.body.link || request.body.code)){
    var challenge = await Challenge.findById(challengeId)
    
    var newWork = {
      title: request.body.title,
      
    };
    if (request.body.link)
        newWork.link = request.body.link
      else
        newWork.code = request.body.code
        
      
    if(!challenge.work)
      challenge.work=[];
    
    challenge.work.push(newWork);
    
        challenge.section=request.body.section
       
        challenge.save().then(async () => {
            response.status(200);
            response.redirect('/challenge/' + challengeId);
          })
        } else {
          response.status(400);
          response.send("An error occurred");
    } 
    response.redirect('/challenge/' + challengeId);
    
  }, 

};

module.exports = challengelist;
