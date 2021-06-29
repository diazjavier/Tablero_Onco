const express = require('express');
const path = require('path');
const router = express.Router();
const passport = require('passport');
// const conn = require('../conn');
const conn = require(path.join(__dirname, '..', 'conn'));
const generator = require('generate-password');
const { Autenticado, NoAutenticado, EsAdmin } = require(path.join(__dirname, '..', 'libs', 'auth'));
const helpers = require(path.join(__dirname, '..', 'libs', 'helpers'));
// const transporter = require('../libs/transporter');
const transporter = require(path.join(__dirname, '..', 'libs', 'transporter'));

router.get('/signup', Autenticado, EsAdmin, (req, res) => {
  const protoUser ={
    nombre: '',
    usuario: '',
    email: '',
    idRol: 0,
    activo: 0,
    password: ''
  };
  res.render(path.join('auth', 'signup'), {
    message: '',
    usuario: protoUser
  });
});

router.post('/signup', Autenticado, EsAdmin, async (req, res) => {
  const { nombre, usuario, email } = req.body;

  if (req.body.idRol) {
    idRol = 2;
  } else {
    idRol = 1;
  };

  if (req.body.activo) {
    activo = 1;
  } else {
    activo = 0;
  };

  // const { password } = req.body;

  const newUser = {
    nombre: nombre,
    usuario: usuario,
    email: email,
    idRol: idRol,
    activo: activo
    // password: password
  };

  // FALTA VALIDAR:
  //  - Que no exista el usuario ni el mail en la BD
  //  - Que la contraseña tenga la fortaleza necesaria

  if (!nombre || !usuario || !email) {
    res.render(path.join('auth', 'signup'), {
      message: 'Todos los datos son requeridos',
      usuario: newUser
    });

  } else {
    const existUsr  = await conn.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    const existMail  = await conn.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (existUsr.length > 0) {
      res.render(path.join('auth', 'signup'), {
        message: 'El usuario ya existe',
        usuario: newUser
      });

    } else if (existMail.length > 0) {
      res.render(path.join('auth', 'signup'), {
        message: 'Existe un usuario registrado con este correo electrónico',
        usuario: newUser
      });

    } else {
      const newPasswd = generator.generate({
        numbers: true,
        symbols: true
      });

      newUser.password = await helpers.encryptPassword(newPasswd);
      const result = await conn.query('INSERT INTO usuarios SET ?', [newUser]);
      newUser.id = result.insertId;

      if(result.insertId > 0){

          let contentHTM = [
            '<h3>Tablero de Medicamentos de CABA</h3>',
            '<p>Se han establecido sus credenciales de acceso</p>',
            '<p>Sus nuevas credenciales son: </p>',
            '<br>',
            '<ul>',
            '<li>Usuario: <b> ', usuario, '</b></li>',
            '<li>Contraseña: <b> ', newPasswd, '</b></li>',
            '</ul>',
            '<br>',
            '<p>Por favor cambie esta contraseña cuando reingrese al tablero</p>',
            '<p>Ante cualquier duda póngase en contacto con el administrador</p>',
            '<p>Muchas gracias</p>'
          ].join('');

          let mailOptions = {
            from: 'tablero.caba@gmail.com',
            to: email,
            replyTo: 'diazjavier10@yahoo.com.ar',
            subject: 'Tablero de medicamentos - CABA - Activación de credenciales de acceso',
            html: contentHTM
          };

          const info = await transporter.sendMail(mailOptions, (err, data) => {
            if(err) {
              console.log('Ha ocurrido un error en el envío del mail: ', err);
            } else {
              console.log('Mensaje enviado! ');
            };
          });
          res.send('<script>alert("El usuario fue registrado exitosamente. Un correo electrónico le fue enviado con las credenciales de acceso"); window.location.href = "/usuarios";</script>');

      } else {
        req.flash('noFind', 'No ha sido posible cambiar las credenciales. <br>Si no puede acceder al tablero por favor póngase en contacto con el administrador');
        res.redirect('/signup');
      };

    };
  };
});

router.get('/signin', NoAutenticado, (req, res) => {
  res.render(path.join('auth', 'signin'));
});

router.post('/signin', NoAutenticado, passport.authenticate('local.signin', {
  successRedirect: 'periodo',
  failureRedirect: 'signin',
  failureFlash: true
}));

router.get('/usuarios', Autenticado, EsAdmin, async (req, res) => {
  const usr = await conn.query('SELECT * FROM usuarios');
  let usuarios = [];
  for (i = 0; i < usr.length; i++) {
    let usrTemp = {
      id: usr[i].idUsuario,
      nombre: usr[i].nombre,
      usuario: usr[i].usuario,
      email: usr[i].email,
      rol: usr[i].idRol,
      activo: usr[i].activo
    };
    usuarios.push(usrTemp);
  };
  res.render('auth/usuarios', {
    title: 'Usuarios',
    linkPre: "#",
    linkPost: "#",
    usuarios: usuarios
  });
});

router.get('/edituser/:id', Autenticado, EsAdmin, async (req, res) => {
  const { id } = req.params;
  const usr = await conn.query('SELECT * FROM usuarios WHERE idUsuario = ?', [id]);
  let usrTemp = {
    idUser: usr[0].idUsuario,
    nombre: usr[0].nombre,
    usuario: usr[0].usuario,
    email: usr[0].email,
    rol: usr[0].idRol,
    activo: usr[0].activo
  };
  res.render(path.join('auth', 'edituser'), {
    usuario: usrTemp,
    message: ''
  });
});

router.post('/edituser/:id', Autenticado, EsAdmin, async (req, res) => {
  const { id } = req.params;
  let nombre = req.body.nombre;
  let usuario = req.body.usuario;
  let email = req.body.email;
  let idRol = 1;
  if (req.body.idRol) {
    idRol = 2;
  };
  let activo = 0;
  if (req.body.activo) {
    activo = 1;
  };

  let usrTemp = {
    nombre: nombre,
    usuario: usuario,
    email: email,
    idRol: idRol,
    activo: activo
  };

  if (!nombre || !usuario || !email) {
    usrTemp.idUser = id;
    res.render(path.join('auth', 'edituser'), {
      usuario: usrTemp,
      message: 'Todos los datos son requeridos'
    });
  } else {

    await conn.query('UPDATE usuarios SET ? WHERE idUsuario = ?', [usrTemp, id]);
    res.send('<script>alert("Los datos del usuario fueron guardados exitosamente"); window.location.href = "/usuarios";</script>');
    // res.redirect('/usuarios');
  };
});

router.get('/inactive/:id', Autenticado, EsAdmin, async (req, res) => {
  const { id } = req.params;
  await conn.query('UPDATE usuarios SET activo = 0 WHERE idUsuario = ?', [id]);
  res.redirect('/usuarios');
});

router.get('/active/:id', Autenticado, EsAdmin, async (req, res) => {
  const { id } = req.params;
  await conn.query('UPDATE usuarios SET activo = 1 WHERE idUsuario = ?', [id]);
  res.redirect('/usuarios');
});

router.get('/changepswd/:id', Autenticado, (req, res) => {
  const { id } = req.params;
  const message = '';
  res.render(path.join('auth', 'changepswd'), {
    id: id,
    message: message
  });
});

router.post('/changepswd/:id', Autenticado, async (req, res) => {
  const { id } = req.params;
  let { password, newpassword1, newpassword2 } = req.body;

  if (!password || !newpassword1 || !newpassword2) {
    const message = 'Todos los datos son obligatorios';
    res.render(path.join('auth', 'changepswd'), {
      id: id,
      message: message
    });
  };

  const actual = await conn.query('SELECT password FROM usuarios WHERE idUsuario = ?', [id]);

  if (actual.length > 0) {
    const actualPasswd = actual[0].password;

    const validPassword = await helpers.matchPassword(password, actualPasswd);

    if (validPassword) {
      if (newpassword1 == newpassword2) {
        encrypedPass = await helpers.encryptPassword(newpassword1);
        await conn.query('UPDATE usuarios SET password = ? WHERE idUsuario = ?', [encrypedPass, id]);
        res.send('<script>alert("La contraseña fue cambiada exitosamente"); window.location.href = "/periodo";</script>');
        // res.redirect('/periodo');
      } else {
        const message = 'Los campos de la nueva contraseña  no coinciden';
        res.render(path.join('auth', 'changepswd'), {
          id: id,
          message: message
        });
      };
    } else {
      const message = 'Contraseña incorrecta';
      res.render(path.join('auth', 'changepswd'), {
        id: id,
        message: message
      });
    };
  } else {

    res.redirect('/periodo'); //Agregar mensaje de usuario inexistente
  };
});

router.get('/logout', Autenticado, (req, res) => {
  req.logOut();
  res.redirect('/signin');
});

module.exports = router;
