const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete', 'root', 'y153m534', {
//     dialect: 'mysql',
//     host: 'localhost'
// });


// online
const sequelize = new Sequelize('sql12316404', 'sql12316404', 'rwDZ7PY5iT', {
    dialect: 'mysql',
    host: 'sql12.freesqldatabase.com'
});

module.exports = sequelize;