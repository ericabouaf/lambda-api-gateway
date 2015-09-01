
var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser')

/**
 * Setting up express app
 */

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


/**
 * Setting up AWS SDK
 */
var AWS = require('aws-sdk');
AWS.config = new AWS.Config({
  region: process.env.AWS_REGION || 'us-east-1'
});


/**
 * Loading job files
 */
var jobfilestoload = process.argv.slice(2);
if(jobfilestoload.length === 0) {
  console.log("No job file ! ex: node index.js sample-jobs.js");
  console.log("Exiting...");
  process.exit(1);
}
var jobs = [];
jobfilestoload.forEach(function (jobfile) {
  jobs = jobs.concat( require(path.join(process.cwd(), jobfile)) );
});



function setupRoute(job) {

  console.log('setting up '+job.url);

  app.post(job.url, function (req, res) {

    console.log(job.url, new Date(), req.body, req.params);

    var lambda = new AWS.Lambda();

    // Merging req.params into req.body
    for(var k in req.params) {
      req.body[k] = req.params[k];
    }

    job.lambda.Payload = JSON.stringify(req.body);

    lambda.invoke(job.lambda, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
      res.json(data);
    });

  });

}

jobs.forEach(setupRoute);


var server = app.listen(process.env.PORT || 3000, function () {
  var host = 'localhost';
  var port = server.address().port;
  console.log('aws-api-gateway listening at http://%s:%s', host, port);
});
