/* Modules to make API Calls to TgBot Server
*   Exported Modules:
*     1. postEventNotification(occurenceObj): For posting event notification to tg bot to notify subscribers
*/

const request = require('request');

const TGBOT_SERVER_URL = `${process.env.TG_BOT_URL}/${process.env.BOT_API_PATH}`

function postEventNotification(occurenceObj) {
  return new Promise(function(resolve, reject) {
    //TODO: Get list of subscribers from DB
    const subscriberList = [];

    const url = `${TGBOT_SERVER_URL}/notify-event`;
    const options = {
      method: 'post',
      url: url,
      headers: {'content-type': 'application/json' },
      body: {
        event_name: occurenceObj.event_name,
        event_message: occurenceObj.message_format,
        date: occurenceObj.date,
        time: occurenceObj.time,
        subscriber_list: subscriberList,
      },
      json: true,
    };

    request(options, function(error, response, body) {
      if(!error && response.statusCode == 200) {
        resolve('Event notification sent to tg bot server: ' + JSON.stringify(occurenceObj));
      } else {
        reject(error);
      }
    });
  });
}
