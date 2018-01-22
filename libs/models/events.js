const Sequelize = require('sequelize');

const {
  postgres,
} = require('../config/database');

const sequelize = new Sequelize(postgres.database, postgres.username, postgres.password, {
  port: postgres.port,
  host: postgres.host,
  logging: false,
  dialect: 'postgres',
  dialectOptions: {
    application_name: postgres.applicationName,
  },
});

const Events = sequelize.define('events', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  event_name: {
    type: Sequelize.CHAR,
  },
  message_format: {
    type: Sequelize.CHAR,
  }
}, {
  timestamps: true,
  createdAt: 'creation_date',
  updatedAt: 'modified_date',
  freezeTableName: true,
  tableName: 'events',
});

module.exports = {
  Events,
};
