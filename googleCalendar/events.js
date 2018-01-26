const config = require('./config/settings');
const CalendarAPI = require('node-google-calendar');
const moment = require('moment');

// Sample Execution
// listSingleEventsWithinDateRange("2018-01-01T00:00:00+08:00","2018-12-01T00:00:00+08:00");

const datetimeobj = moment("2018-03-03T20:00:00+08:00");
console.log(datetimeobj.format("dddd, DD MMM YYYY"));

function listSingleEventsWithinDateRange(startDateTime, endDateTime) {
  const cal = new CalendarAPI(config);
  const calendarIdList = config.calendarId;
  const calendarId = calendarIdList['primary'];
  let eventsArray = [];
	let params = {
		timeMin: startDateTime,
		timeMax: endDateTime,
		singleEvents: true,
		orderBy: 'startTime'
	}
	return new Promise(function(resolve, reject) {
    cal.Events.list(calendarId, params)
  		.then(json => {
  			for (let i = 0; i < json.length; i++) {
  				let event = {
            id: json[i].id,
  					summary: json[i].summary,
            description: json[i].description,
  					location: json[i].location,
  					start: json[i].start,
  					end: json[i].end,
  				};
  				eventsArray.push(event);
  			}
  			console.log('List of events on calendar within time-range:');
  			console.log(eventsArray);
  			resolve(eventsArray);
  		}).catch(err => {
        console.log(err);
  			reject('Error: listSingleEventsWithinDateRange', err.message);
  		});
  });
}

module.exports = {
  listSingleEventsWithinDateRange
}
