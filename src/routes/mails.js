const express = require('express');
const path = require('path');
const router = express.Router();
const generator = require('generate-password');
const { Autenticado, NoAutenticado, EsAdmin } = require(path.join(__dirname, '..', 'libs', 'auth'));
// const conn = require('../conn');
// const helpers = require('../libs/helpers');
// const transporter = require('../libs/transporter');
const conn = require(path.join(__dirname, '..', 'conn'));
const helpers = require(path.join(__dirname, '..', 'libs', 'helpers'));
const transporter = require(path.join(__dirname, '..', 'libs', 'transporter'));

router.get('/senduser', NoAutenticado, (req, res) => {
  res.render(path.join('auth', 'senduser'));
});

router.post('/senduser', NoAutenticado, async (req, res) => {
  const { email } = req.body;

  const user = await conn.query('SELECT * FROM usuarios WHERE email = ?', [email]);

  if(user.length == 1){

    const newPasswd = generator.generate({
      numbers: true,
      symbols: true
    });

    const newEncryptedPasswd = await helpers.encryptPassword(newPasswd);

    const result = await conn.query('UPDATE usuarios SET password = ? WHERE idUsuario = ?', [newEncryptedPasswd, user[0].idUsuario]);

    if(result.changedRows > 0){

        let contentHTM = [
          '<h3>Tablero de Medicamentos de CABA</h3>',
          '<p>Se han establecido sus credenciales de acceso</p>',
          '<p>Sus nuevas credenciales son: </p>',
          '<br>',
          '<ul>',
          '<li>Usuario: <b> ', user[0].usuario, '</b></li>',
          '<li>Contraseña: <b> ', newPasswd, '</b></li>',
          '</ul>',
          '<br>',
          '<p>Por favor cambie esta contraseña cuando reingrese al tablero</p>',
          '<p>Ante cualquier duda póngase en contacto con el administrador</p>',
          '<p>Muchas gracias</p>'
        ].join('');

      //   const transporter = nodemailer.createTransport({
      //     host: 'mail.funsalud.com.ar',
      //     port: 26,
      //     secure: false,
      //     auth: {
      //       user: 'admin@funsalud.com.ar',
      //       pass: 'x#pWztc6'
      //     }
      //   });
      //
      //   transporter.verify().then(() => {
      //     console.log('Listo para enviar!!!!!');
      //   });
      //
      //   const info = await transporter.sendMail({
      //     from: 'admin@funsalud.com.ar',
      //     to: 'diazjavier@hotmail.com',
      //     replyTo: 'diazjavier10@yahoo.com.ar',
      //     subjet: 'Prueba nodemailer!!!!',
      //     html: contentHTM
      //   });
      //   console.log('Mensaje enviado! ', info.response);
      //   res.send('ENVIADO')
      // });

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
        // console.log('Mensaje enviado! ', info.response);
        res.send('<script>alert("Sus nuevas credenciales fueron enviadas por e-mail"); window.location.href = "/signin";</script>');
        // res.redirect('/signin');


    } else {
      req.flash('noFind', 'No ha sido posible cambiar las credenciales. <br>Si no puede acceder al tablero por favor póngase en contacto con el administrador');
      res.redirect('/senduser');
    };

  } else if(user.length > 1) {
    req.flash('noFind', 'Hay más de un usuario con esta dirección de correo electrónico. <br>Por favor póngase en contacto con el administrador');
    res.redirect('/senduser');

  } else {
    req.flash('noFind', 'No existe un usuario con este correo electrónico. <br>Por favor ingrese la dirección de e-mail con la que fue registrado');
    res.redirect('/senduser');
  };

});

module.exports = router;
