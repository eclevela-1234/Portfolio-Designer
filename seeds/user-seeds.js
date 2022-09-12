const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'eclevela-1234',
    email: 'eliot@email.com',
    password: 'password123',
    name: 'Eliot Cleveland',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.',
    social: 'https://www.linkedin.com/in/eliotcleveland/'
  },
  {
    username: 'easmsm',
    email: 'emily@email.com',
    password: 'password123',
    name: 'Emily Kukwa'
  },
  {
    username: 'danielcnow',
    email: 'daniel@email.com',
    password: 'password123',
    name: 'Daniel Chow'
  },
  {
    username: 'tayyjohnson',
    email: 'taylor@email.com',
    password: 'password123',
    name: 'Taylor Johnson'
  },
  {
    username: 'whittenburgsa',
    email: 'savannah@email.com',
    password: 'password123',
    name: 'Savannah Whittenburg'
  },
 
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
