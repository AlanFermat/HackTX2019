const Hero = require('./company-model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

const get = (req, res) => {
    console.log("here");
    const docquery = Hero.find({}).read(ReadPreference.NEAREST);
    docquery
      .exec()
      .then(heroes => {
        res.json(heroes);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }

module.exports = {get};