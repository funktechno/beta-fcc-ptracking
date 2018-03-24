const mongoose = require('mongoose');

// this would be the correct way of modeling
const schema = new mongoose.Schema(
  {
    tinyId: { type: String, required: true },
    "title": { type: String, required: true },
    "sections": [{
      tinyId: { type: String, required: true },
      "title": { type: String, required: true },
      "challenges":[{
        tinyId: { type: String, required: true },
        "title": { type: String, required: true },
        "work": 
          [{
            "id": { type: String, required: false },
            "title": { type: String, required: false },
            "link": { type: String, required: false },
          }]
      }]
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

const ChallengeGenres = mongoose.model('ChallengeGenres', schema);

module.exports = ChallengeGenres;
