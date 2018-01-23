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
router.post('/subscribe', function(req, res, next) {
  const newSubscriberObj = req.body;
  console.log("Received new subscriber request: " + JSON.stringify(newSubscriberObj));
  //TODO: Persistence method to store new subscriber info
  res.status(200).send('New Subscriber Request Received')
})

module.exports = router;
