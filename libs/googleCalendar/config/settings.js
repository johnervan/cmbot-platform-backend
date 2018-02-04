// Sample CalendarAPI settings
const SERVICE_ACCT_ID = process.env.GOOGLE_CAL_ACCT;
const KEY = process.env.GOOGLE_CAL_KEY.replace(/\\n/g, '\n');
const TIMEZONE = 'UTC+08:00';
const CALENDAR_ID = {
	'primary': process.env.GOOGLE_CAL_ID,
};

module.exports.serviceAcctId = SERVICE_ACCT_ID;
module.exports.key = KEY;
module.exports.timezone = TIMEZONE;
module.exports.calendarId = CALENDAR_ID;
