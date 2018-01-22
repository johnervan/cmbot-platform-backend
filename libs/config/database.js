const POSTGRES_USERNAME = 'inawngnkfgdrnd';
const POSTGRES_PASSWORD = 'f9ca4a79280acd41ed754e85f8d6850f4c639d31beb537ca6feadbd63653f554';
const POSTGRES_HOST = 'ec2-54-243-193-227.compute-1.amazonaws.com';
const POSTGRES_PORT = '5432';
const POSTGRES_DATABASE = 'd344vfrsc6l1ag';
const APPLICATION_NAME = 'tcc-campus-platform';

module.exports = {
  postgres: {
    username: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    database: POSTGRES_DATABASE,
    applicationName: APPLICATION_NAME,
  },
};
