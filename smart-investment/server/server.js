var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = "mongodb://hacktx3:SYbsXZtnFFZNLhX0VTinqsVoP3a4dwpAJfsTPNscPVqUCJWgJllZQczDjcm7UANmWOfVT25xDVptQewSbZb4Jg==@hacktx3.mongo.cosmos.azure.com:10255/?ssl=true";
// var json = require('./test2.json'); 
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});

// insert data from json
// var insertDocument = function(db, callback) {
//     var arrayLength = json.length;
//     for (var i = 0; i < arrayLength; i++) {
//         db.collection('countries').insertOne(
//             json[i], function(err, result) {
//             assert.equal(err, null);
//             console.log("Inserted a document into the countries collection.");
//             callback();
//         });
//         // break;
//     }
// };
app.post('/company', (request, response) => {
  console.log(request.body);
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        var db = client.db('hacktx');
        db.collection("companies").findOne({"name": request.body.name}, function(err, result) {
            if (err) throw err;
            console.log(result.name);
            response.json(result);
          });
    });
  });

app.get('/countries', (request, response) => {
    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        var db = client.db('hacktx');
        db.collection("countries").find().toArray(function(err, result) {
            if (err) throw err;
            // console.log(result.name);
            response.json(result);
          });
    });
  });



MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    var db = client.db('hacktx');
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});