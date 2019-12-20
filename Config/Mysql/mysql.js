const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'y153m534', {
    dialect: 'mysql',
    host: 'localhost'
});


module.exports = sequelize;