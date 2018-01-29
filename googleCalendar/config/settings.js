// Sample CalendarAPI settings
const SERVICE_ACCT_ID = 'developer@tcc-campus-bot.iam.gserviceaccount.com';
const KEY = process.env.GOOGLE_CAL_KEY.replace(/\\n/g, '\n');
const TIMEZONE = 'UTC+08:00';
const CALENDAR_ID = {
	'primary': 't7cdso1jtsmtjqhlprn6om2h5g@group.calendar.google.com',
};

module.exports.serviceAcctId = SERVICE_ACCT_ID;
module.exports.key = KEY;
module.exports.timezone = TIMEZONE;
module.exports.calendarId = CALENDAR_ID;
