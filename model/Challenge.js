const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;

const ChallengeSchema = new mongoose.Schema(
  {
    "title": { type: String, required: true },
    "genre": { type: String, required: false },// for now these aren't required until ui implemented
    "section": { type: String, required: false },
    "work": 
      [{
        "title": { type: String, required: true },
        "link": { type: String, required: false, max: 2083 }, // max length of url is 2083 one or the other is required
        "code": { type: String, required: false } // may need to allow users to edit this eventually
      }]
  },
  {
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      }
    },
  }
);

const Challenge = mongoose.model('Challenge', ChallengeSchema);

module.exports = Challenge;
