const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: 'tablero.caba@gmail.com',
    pass: 'atmnmabwdnxkdtfd'
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify().then(() => {
  console.log('Listo para enviar mails!!!!!');
});

module.exports = transporter;
