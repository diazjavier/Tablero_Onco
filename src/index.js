const express = require('express');
const passport = require('passport');
const morgan = require('morgan');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySqlStore = require('express-mysql-session');
const {database} = require('./libs/database');
const app = express();

require(path.join(__dirname, 'libs', 'passport'));

app.set('port', process.env.PORT || 3000);
// app.set('views', path.join(__dirname, 'statics'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.set('rol', 2);

// app.use('/static', express.static(path.join(__dirname, 'statics')));
app.use(express.static(path.join(__dirname, 'statics')));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
  secret: 'mi secreto',
  resave: true,
  saveUninitialized: true,
  store: new MySqlStore(database)
}));
app.use(flash());
app.use(morgan('dev'));

app.use(passport.initialize());
app.use(passport.session());

//Variables Globales
app.use((req, res, next) => {
  // app.locals.elUsuario = {usuario: 'ElUsuario', idRol:2};
  app.locals.elUsuario = req.user;
  app.locals.noFind = req.flash('noFind');
  next();
});

app.use(require(path.join(__dirname, 'routes')));
app.use(require(path.join(__dirname, 'routes', 'auth')));
app.use(require(path.join(__dirname, 'routes', 'mails')));
// app.use('/auth', require(path.join(__dirname, 'routes', 'auth')));
// app.use(require(path.join(__dirname, 'routes', 'usuarios')));

app.listen(app.get('port'), () => {
  console.log('Servidor en puerto ', app.get('port'));
});
