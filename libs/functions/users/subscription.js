const {
  Users
} = require('../../models/users');

const {
  Op,
} = require('sequelize');

const {
  GeneralError,
  NotFoundError,
} = require('../../utils/error');

const SUBSCRIBE_ACTION = 'action="subscribeUser"';
const DELETE_ACTION = 'action="deleteUser"';

/**
 * Creates instance in users table
 *
 * @param {object} newSubscriberObj
 */
function subscribe(newSubscriberObj) {
  return new Promise((resolve, reject) => {
    const telegramId = newSubscriberObj.telegram_id;
    const telegramName = newSubscriberObj.telegram_name;
    console.log(`${SUBSCRIBE_ACTION} telegramId="${telegramId}" \
    telegramName="${telegramName}"`);

    Users.create({
      telegram_id: telegramId,
      telegram_name: telegramName,
    }).then((result) => {
      console.log(`${SUBSCRIBE_ACTION} event="success"`);
      resolve(result);
    }).catch((err) => {
      console.log(`${SUBSCRIBE_ACTION} error="${err}"`);
      reject(new GeneralError());
    });
  });
}

/**
 * Deletes instance in users table
 *
 * @param {INTEGER} idToDelete
 */
function remove(idToDelete) {
  return new Promise((resolve, reject) => {
    console.log(`${DELETE_ACTION} idToDelete="${idToDelete}"`);

    Users.destroy({
      where: {
        telegram_id: {
          [Op.eq]: idToDelete,
        },
      }
    }).then((result) => {
      console.log(`${DELETE_ACTION} event="success"`);
      resolve();
    }).catch((err) => {
      console.log(`${DELETE_ACTION} error="${err}"`);
      reject(new GeneralError());
    });
  });
}

module.exports = {
  subscribe,
  remove,
};
