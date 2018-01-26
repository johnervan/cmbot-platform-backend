const filepath = require('filepath');
var path = filepath.create("config", "key-file.pem");

// Sample CalendarAPI settings
const SERVICE_ACCT_ID = 'developer@tcc-campus-bot.iam.gserviceaccount.com';
const KEYFILE = path.toString();
const TIMEZONE = 'UTC+08:00';
const CALENDAR_ID = {
	'primary': 't7cdso1jtsmtjqhlprn6om2h5g@group.calendar.google.com',
};

module.exports.serviceAcctId = SERVICE_ACCT_ID;
module.exports.keyFile = KEYFILE;
module.exports.timezone = TIMEZONE;
module.exports.calendarId = CALENDAR_ID;
