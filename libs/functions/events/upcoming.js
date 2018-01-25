const is = require('is_js');

const {
  Events,
  Occurrences,
} = require('../../models/events');

const {
  Op,
} = require('sequelize');

const {
  GeneralError,
  NotFoundError,
} = require('../../utils/error');

const GET_UPCOMING_ACTION = 'action="getUpcoming"';

/**
 * Get upcoming events
 *
 * @param {STRING} startDate YYYY-MM-DD
 * @param {STRING} endDate YYYY-MM-DD
 */
function getUpcoming(startDate, endDate) {
  return new Promise((resolve, reject) => {
    console.log(`${GET_UPCOMING_ACTION} startDate="${startDate}"
    endDate="${endDate}"`);
    Occurrences.findAll({
      attributes: ['date', 'time'],
      where: {
        date: {
          [Op.lte]: Date.parse(endDate),
          [Op.gte]: Date.parse(startdate),
        },
      },
      include: [Events],
    }).then((result) => {
      console.log(`${GET_UPCOMING_ACTION} result="${JSON.stringify(result)}"`);
      result = formatUpcomingEvents(result);
      resolve(result);
    }).catch((err) => {
      console.log(`${GET_SUBSCRIBER_LIST_ACTION} error="${err}"`);
      reject(new GeneralError());
    });
  });
}

function formatUpcomingEvents(result) {
  console.log("formatting upcoming events");
  var formatted = [];
  for (i = 0; i < result.length; i++) {
    var event_object = {};
    event_object["event_name"] = result[i].Events.event_name;
    event_object["message_format"] = result[i].Events.message_format;
    event_object["date"] = result[i].date;
    event_object["time"] = result[i].time;
    formatted.push(event_object);
  }
  console.log("formatted upcoming events:", toReturn);
  return formatted;
}

module.exports = {
  getUpcoming,
};
