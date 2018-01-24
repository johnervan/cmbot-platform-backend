/* Routes to handle API calls between platform and tg bot
*   Endpoints:
*     1. POST /subscribe => Add new subscriber
*/

var express = require('express');
var router = express.Router();

const users = require('../libs/functions/users');

/* GET response from bot api endpoint. */
router.get('/', function(req, res, next) {
  res.status(200).send('All Good');
});

/* POST new subscriber.
* body: {
*   telegram_id: <INTEGER>,
*   telegram_name: <STRING>,
*   }
*/
router.post('/subscriber', function(req, res, next) {
  const newSubscriberObj = req.body;
  console.log("Received new subscriber request: " + JSON.stringify(newSubscriberObj));
  users.remove(newSubscriberObj).then(result => {
    console.log("Successefully subscribed user");
    res.status(200).send('New Subscriber Request Received');
  }).catch(err => {
    var error_message = "Error when subscribing user";
    console.log(error_message);
    res.status(500).send(error_message);
  });
})

/* DELETE subscriber.
* query_string: {
*   telegram_id: <INTEGER>
*   }
*/
router.delete('/subscriber', function(req, res, next) {
  const idToDelete = req.query.id;
  if (idToDelete) {
    console.log("Received unsubscribe request for id: " + idToDelete);
    users.delete(idToDelete).then(result => {
      console.log("Successefully deleted user");
      res.status(200).send('Unsubscribe Request Received');
    }).catch(err => {
      var error_message = "Error when deleting user";
      console.log(error_message);
      res.status(500).send(error_message);
    });
  } else {
    console.log("Error: No id found in query string");
    res.status(400).send("No id found in query string");
  }
})

module.exports = router;
