/* Routes to handle API calls between platform and tg bot
*   Endpoints:
*     1. POST /subscribe => Add new subscriber
*/

var express = require('express');
var router = express.Router();

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
  //TODO: Persistence method to store new subscriber info
  res.status(200).send('New Subscriber Request Received');
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
    //TODO: Persistence to delete subscriber with given id
    res.status(200).send('Unsubscribe Request Received');
  } else {
    console.log("Error: No id found in query string");
    res.status(400).send("No id found in query string");
  }
})

module.exports = router;
