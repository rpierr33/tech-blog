const Sequelize = require('sequelize');

require('dotenv').config();

console.log('env file1!!!', process.env)


process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : 
  sequelize = new Sequelize('tech_blog_db', 'root', 'password', {
      host: 'localhost',
      dialect: 'mysql',
      
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;

