/* Routes to handle API calls between platform and tg bot
*   Endpoints:
*     1. GET /subscriber => Get list of subscribers
*     2. POST /subscriber => Add new subscriber
*     3. DELETE /subscriber => Delete subscriber
*/

var express = require('express');
var router = express.Router();

const users = require('../libs/functions/users');
const gCal = require('../libs/googleCalendar/events');
const dateUtil = require('../libs/utils/dateTimeUtils');

/* GET response from bot api endpoint. */
router.get('/', function(req, res, next) {
  res.status(200).send('All Good');
});

/* GET list of subscribers.
* return: {
*   subscriber_list: [{telegram_id: <INTEGER>, telgram_name: <STRING}, ...]
* }
*/
router.get('/subscriber', function(req, res, next) {
  users.getSubscriberList().then((subscriberList) => {
    console.log("Sending list of subscribers...");
    res.status(200).json(subscriberList);
  }).catch((err) => {
    const error_message = "Error when getting list of subscribers."
    res.status(500).send(error_message);
  })
})

/* POST new subscriber.
* body: {
*   telegram_id: <INTEGER>,
*   telegram_name: <STRING>,
*   }
*/
router.post('/subscriber', function(req, res, next) {
  const newSubscriberObj = req.body;
  console.log("Received new subscriber request: " + JSON.stringify(newSubscriberObj));
  users.subscribe(newSubscriberObj).then(result => {
    console.log("Successefully subscribed user");
    res.status(200).send('New Subscriber Request Received');
  }).catch(err => {
    var error_message = "Error when subscribing user!";
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
    users.remove(idToDelete).then(result => {
      console.log("Successefully deleted user");
      res.status(200).send('Unsubscribe Request Received');
    }).catch(err => {
      var error_message = "Error when deleting user!";
      console.log(error_message);
      res.status(500).send(error_message);
    });
  } else {
    console.log("Error: No id found in query string");
    res.status(400).send("No id found in query string");
  }
})

/* GET upcoming events in daterange.
* query_string: {
*   start_date: <STRING> "YYYY-MM-DD"
*   end_date: <STRING> "YYYY-MM-DD"
*   }
* return: [{event_obj}, ...]
*/
router.get('/upcoming', function(req, res, next) {
  const startDateTime = dateUtil.formatDateForGoogleCal(req.query.start_date);
  const endDateTime = dateUtil.formatDateForGoogleCal(req.query.end_date);
  if (startDateTime && endDateTime) {
    console.log(`Request Start DateTime: ${startDateTime}, End DateTime: ${endDateTime}`)
    gCal.listSingleEventsWithinDateRange(startDateTime, endDateTime).then((result) => {
      res.status(200).json(result)
    }).catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
  } else {
    console.log("Error: No start/end datetime found or invalid datetime in query string");
    res.status(400).send("No start/end datetime or invalid datetime found in query string");
  }
})

module.exports = router;
