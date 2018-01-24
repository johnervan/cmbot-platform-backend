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

const {
  Events,
} = require('./events');

const Occurrences = sequelize.define('occurrences', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  event_id: {
    type: Sequelize.INTEGER,
  },
  date: {
    type: Sequelize.DATEONLY,
  },
  time: {
    type: Sequelize.TIME,
  }
}, {
  timestamps: true,
  createdAt: 'creation_date',
  updatedAt: 'modified_date',
  freezeTableName: true,
  tableName: 'user_intents',
});

Occurrences.belongsTo(Events, {
  foreignKey: 'event_id',
  targetKey: 'id',
});

module.exports = {
  Occurrences,
};
