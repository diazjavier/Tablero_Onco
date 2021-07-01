const mysql = require('mysql2');
const { promisify } = require('util');
// const conn = {
//     database: {
//       host: 'localhost',
//       user: 'TableroCABA',
//       password: '123456Aa',
//       database: 'tablerocaba'
//     }
// }
const conn = {
    database: {
      host: '134.209.124.47',
      user: 'jdiazbd',
      password: '123456Aa?',
      database: 'tablerocaba'
    }
}
const pool = mysql.createPool(conn.database);

pool.getConnection((err, connection) => {
  if(err){
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
      console.error('La conexión con la base de datos fue cerrada');
    }
    if(err.code === 'ER_CON_COUNT_ERROR'){
      console.error('La base de datos tiene demasiadas conexiones');
    }
    if(err.code === 'ECONNREFUSED'){
      console.error('La conexión fue rechazada');
    }
  }
  if(connection){
    connection.release();
    console.log('Conexión exitosa a MySQL');
    return;
  }
});

//Para hacer promesas con pool
pool.query = promisify(pool.query);

module.exports = pool;
