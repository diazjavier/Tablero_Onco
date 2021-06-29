const passport = require('passport');
const path = require('path');
const localStrategy = require('passport-local').Strategy;
// const conn = require('../conn');
const conn = require(path.join(__dirname, '..', 'conn'));
// const helpers = require('./helpers');
const helpers = require(path.join(__dirname, 'helpers'));
// const auth = require('./auth')
const auth = require(path.join(__dirname, 'auth'))

passport.use('local.signin', new localStrategy({
  usernameField: 'usuario',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  console.log('Usuario: ', username);
  console.log('Passwd: ', username);
  const rows = await conn.query('SELECT * FROM usuarios WHERE usuario = ?', [username])
  if(rows.length > 0){
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password);
    if(validPassword){
      req.session.ROL = user.idRol;
      done(null, user); //Agregar mensaje de bienvenida
    } else {
      req.flash('noFind', 'Contraseña incorrecta, por favor reingrese sus datos.');
      done(null, false); //Agregar mensaje de error
    }
  } else {
    req.flash('noFind', 'Usuario inexistente, por favor reingrese sus datos.');
    return done(null, false); //Agregar mensaje de mensaje inexistente
  }
}));

passport.use('local.signup', new localStrategy({
  usernameField: 'usuario',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

  const { nombre } = req.body;
  const { email } = req.body;

  if(req.body.idRol) {
    idRol = 2;
  } else {
    idRol = 1;
  };

  if(req.body.activo) {
    activo = 1;
  } else {
    activo = 0;
  };

  const newUser = {
    nombre: nombre,
    usuario: username,
    password: password,
    email: email,
    idRol: idRol,
    activo: activo
  };

  newUser.password = await helpers.encryptPassword(password);
  await conn.query('INSERT INTO usuarios SET ?', [newUser]);
  newUser.id = result.insertId;
  return done(null, newUser);
}));

passport.serializeUser(function (user, done) {
  done(null, user.idUsuario);
});

passport.deserializeUser( async function (id, done){
  const rows = await conn.query('SELECT * FROM usuarios WHERE idUsuario = ?', [id]);
  done(null, rows[0]);
});
