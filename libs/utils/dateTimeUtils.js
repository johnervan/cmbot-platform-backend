const moment = require('moment-timezone');

function formatDateForGoogleCal(date) {
  if (moment.tz(date, "Asia/Singapore").isValid()) {
    return moment.tz(date, "Asia/Singapore").format();
  } else {
    return null;
  }
}

module.exports = {
  formatDateForGoogleCal,
}
