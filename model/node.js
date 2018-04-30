const Sequelize = require('sequelize');
const path = require('path')
const sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',
  operatorsAliases: false,

  // SQLite only
  storage: path.join(__dirname, '../database/database.sqlite')
});

// 测试是否连接
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

const Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  },
  uid: {
    type: Sequelize.STRING
  }
});
Note.sync()
// Note.sync({ force: true })
// force: true will drop the table if it already exists
// Note.sync().then(() => {
//   // Table created
//   return Note.create({
//     text: '收拾收拾',
//   });
// });

// Note.findAll({ raw: true }).then(notes => {
//   console.log(notes)
// })

// Note.findAll({ raw: true, where: { id: 2 } }).then(note=>{
//     console.log(note)
// })

module.exports = Note