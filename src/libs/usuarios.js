const path = require('path');
// const conn = require('../conn');
const conn = require(path.join(__dirname, '..', 'conn'));

let usuarios = [];

async function users() {
  let usr = await conn.query('SELECT U.idUsuario as id, U.nombre, U.usuario, U.email, R.descripcion as rol, U.activo FROM usuarios U INNER JOIN roles R on U.idRol = R.idRol');
  for(i=0; i < usr.length; i++){
    let usrTemp = {
      id: usr[i].id,
      nombre: usr[i].nombre,
      usuario: usr[i].usuario,
      email: usr[i].email,
      rol: usr[i].rol,
      activo: usr[i].activo
    };
    usuarios.push(usrTemp);
  };
};

users();
console.log(usuarios);
module.exports = usuarios;
