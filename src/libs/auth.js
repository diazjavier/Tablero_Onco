const path = require('path');

module.exports = {
  Autenticado(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect('/signin');
    };
  },
  NoAutenticado(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect('/periodo');
    };
  },
  EsAdmin(req, res, next) {
    if(req.session.ROL == 2) {
      return next();
    } else {
      return res.redirect('/periodo');
    };
  }
};
