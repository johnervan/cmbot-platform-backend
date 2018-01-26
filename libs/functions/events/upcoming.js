const {
  GeneralError,
  NotFoundError,
} = require('../../utils/error');

const GET_UPCOMING_ACTION = 'action="getUpcoming"';

const gCal = require('../googleCalendar/events');

/**
 * Get upcoming events. Returns an array of event objects
 *
 * @param {STRING} startDateTime YYYY-MM-DDTHH:mm:SS+08:00
 * e.g. 2018-01-01T00:00:00+08:00
 * @param {STRING} endDateTime YYYY-MM-DDTHH:mm:SS+08:00
 *
 * @returns [{event_name: <>,
              event_message: <>,
              date_time: <>,
              location: <>
            }, ... ]
 */
function getUpcoming(startDateTime, endDateTime) {
  return new Promise((resolve, reject) => {
    console.log(`${GET_UPCOMING_ACTION} startDateTime="${startDateTime}"
    endDateTime="${endDateTime}"`);
    gcal.listSingleEventsWithinDateRange(startDateTime, endDateTime).then((result) => {
      console.log(`${GET_UPCOMING_ACTION} result="${JSON.stringify(result)}"`);
      result = formatUpcomingEvents(result);
      resolve(result);
    }).catch((err) => {
      console.log(`${GET_UPCOMING_ACTION} error="${err}"`);
      reject(new GeneralError());
    });
  });
}

function formatUpcomingEvents(result) {
  console.log("formatting upcoming events");
  var formatted = [];
  for (i = 0; i < result.length; i++) {
    var event_object = {};
    event_object["event_name"] = result[i].summary;
    event_object["event_message"] = result[i].description;
    event_object["date_time"] = result[i].start.date_Time;
    event_object["location"] = result[i].location;
    formatted.push(event_object);
  }
  console.log("formatted upcoming events:", formatted);
  return formatted;
}

module.exports = {
  getUpcoming,
};
