const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'alesmonde0',
    email: 'nwestnedge0@cbc.com',
    password: 'mypassword1'
  },
  {
    username: 'jwilloughway1',
    email: 'nwestnedge0@cbc.com',
    password: 'mypassword2'
  },
  {
    username: 'iboddam2',
    email: 'ncstoneman2e0@cbc.com',
    password: 'mypassword3'
  },
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;