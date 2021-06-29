const express = require('express');
const path = require('path');
const router = express.Router();
const { Autenticado } = require(path.join(__dirname, '..', 'libs', 'auth'));

router.get('/', Autenticado, (req, res) => {
  res.render('periodo', {
    // rol: elUsuario.idRol,
    title: 'Período',
    linkPre: "/comerciales",
    linkPost: "/evolucion"
  });
});

router.get('/comerciales', Autenticado, (req, res) => {
  res.render('comerciales', {
    rol: 2,
    title: 'Comerciales',
    linkPre: "/genericos",
    linkPost: "/periodo"
  });
});

router.get('/consumo', Autenticado, (req, res) => {
  res.render('consumo', {
    rol: 2,
    title: 'Consumo',
    linkPre: "/precios",
    linkPost: "/dashboard"
  });
});

router.get('/dashboard', Autenticado, (req, res) => {
  res.render('dashboard', {
    rol: 2,
    title: 'Dashboard',
    linkPre: "/consumo",
    linkPost: "/genericos"
  });
});

router.get('/evolucion', Autenticado, (req, res) => {
  res.render('evolucion', {
    rol: 2,
    title: 'Evolución',
    linkPre: "/periodo",
    linkPost: "/precios"
  });
});

// router.get('/static/genericos', (req, res) => {
router.get('/genericos', Autenticado, (req, res) => {
  res.render('genericos', {
    rol: 2,
    title: 'Genéricos',
    linkPre: "/dashboard",
    linkPost: "/comerciales"
  });
});

router.get('/periodo', Autenticado, (req, res) => {
  res.render('periodo', {
    // rol: elUsuario.idRol,
    title: 'Período',
    linkPre: "/comerciales",
    linkPost: "/evolucion"
  });
});

router.get('/precios', Autenticado, (req, res) => {
  res.render('precios', {
    rol: 2,
    title: 'Precios',
    linkPre: "/evolucion",
    linkPost: "/consumo"
  });
});

module.exports = router;
