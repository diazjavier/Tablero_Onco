let colorMedianaK1 = "rgba(252, 170, 10, 0.7)";
let colorMedianaK2 = "rgba(252, 170, 10, 1)";
let colorComarsa1 = "rgba(47, 75, 193, 0.7)";
let colorComarsa2 = "rgba(47, 75, 193, 1)";
let colorVaradero1 = "rgba(50, 193, 47, 0.7)";
let colorVaradero2 = "rgba(50, 193, 47, 1)";
let colorCyV1 = "rgba(65, 0, 148, 0.8)";
let colorCyV2 = "rgba(175, 27, 219, 1)";

// Obtengo las fuentes de datos
let cabeceras = Headers;
let detalle = Detalle;
let productosComerciales = Comerciales;

$(function() {
  $('[data-toggle="tooltip"]').tooltip()
});

function getFechas() {
  // Extraigo sólo las Fechas de las Bases Kairos
  let fechasMulti = detalle.map((det) => det.Fecha);

  // Elimino duplicados de fevchas y me quedo con una sola fecha por base Kairos
  let fechas = fechasMulti.filter(function(value, index, self) {
    return self.indexOf(value) === index;
  });

  // Ordeno el array por fecha de la BD de Kairos
  fechas.sort(function(x, y) {
    return Number(x.Fecha) - Number(y.Fecha);
  });

  let dateMin = fechas[0];
  let dateMax = fechas[fechas.length - 1];

  let diaMin = dateMin.substr(6, 2);
  let mesMin = dateMin.substr(4, 2);
  let anoMin = dateMin.substr(0, 4);
  let fechaMin = new Date(mesMin + "/" + diaMin + "/" + anoMin);

  let diaMax = dateMax.substr(6, 2);
  let mesMax = dateMax.substr(4, 2);
  let anoMax = dateMax.substr(0, 4);
  let fechaMax = new Date(mesMax + "/" + diaMax + "/" + anoMax);

  let diasTranscurridos = difFecha(fechaMin, fechaMax);

  let porc = 0;
  if (diasTranscurridos != null) {
    porc = ((diasTranscurridos * 100) / 365).toFixed(0);
  };

  let fechasResult = {
    "dateMin": dateMin,
    "dateMax": dateMax,
    "fechaMin": fechaMin,
    "fechaMax": fechaMax,
    "diasTranscurridos": diasTranscurridos,
    "porc": porc
  };

  return fechasResult;
};

function getDatosEvol() {
  // Extraigo sólo las Fechas de las Bases Kairos
  let fechasMulti = detalle.map((det) => det.Fecha);

  // Elimino duplicados de fevchas y me quedo con una sola fecha por base Kairos
  let fechas = fechasMulti.filter(function(value, index, self) {
    return self.indexOf(value) === index;
  });

  // Ordeno el array por fecha de la BD de Kairos
  fechas.sort(function(x, y) {
    return Number(x.Fecha) - Number(y.Fecha);
  });

  let lblFechas = [];
  let arrPxQAcumBase = [];
  let arrPxQAcumActual = [];
  let arrPxQBase = [];
  let arrPxQActual = [];
  let preciosBase = [];

  let PxQAcumBase = 0;
  let PxQAcumActual = 0;
  let pInicialP1 = 0;
  let pInicialP2 = 0;

  let dateMin = fechas[0];
  let dateMax = fechas[fechas.length - 1];


  let diaMin = dateMin.substr(6, 2);
  let mesMin = dateMin.substr(4, 2);
  let anoMin = dateMin.substr(0, 4);
  let fechaMin = new Date(mesMin + "/" + diaMin + "/" + anoMin);

  let diaMax = dateMax.substr(6, 2);
  let mesMax = dateMax.substr(4, 2);
  let anoMax = dateMax.substr(0, 4);
  let fechaMax = new Date(mesMax + "/" + diaMax + "/" + anoMax);

  let diasTranscurridos = difFecha(fechaMin, fechaMax);

  // Recorro las bases Kairos
  for (i = 0; i < fechas.length; i++) {
    let PxQBase = 0;
    let PxQActual = 0;
    // Traigo los NNE de esa Base Kairos
    let detallexFecha = detalle.filter(function(detNNE) {
      return detNNE.Fecha == fechas[i];
    });

    // Si es la primara base Kairos tomo estos valores como precios base
    if (i == 0) {
      preciosBase = detallexFecha;
    };

    // Por cada base Kairos recorro todos los NNE
    for (j = 0; j < detallexFecha.length; j++) {
      // Para cada NNE saco el precio basal de cada proveedor
      let nneBase = preciosBase.filter(function(baseNNE) {
        return baseNNE.NNE == detallexFecha[j].NNE;
      });

      PxQAcumBase += (nneBase[0].PrecioP1 * detallexFecha[j].QP1) + (nneBase[0].PrecioP2 * detallexFecha[j].QP2);
      PxQAcumActual += detallexFecha[j].PxQ;
      PxQBase += (nneBase[0].PrecioP1 * detallexFecha[j].QP1) + (nneBase[0].PrecioP2 * detallexFecha[j].QP2);
      PxQActual += detallexFecha[j].PxQ;
    };

    let fechaFormat = new Date(fechas[i].substr(4, 2) + "/" + fechas[i].substr(6, 2) + "/" + fechas[i].substr(0, 4)).toLocaleDateString("es-AR");
    // lblFechas.push(fechas[i]);
    lblFechas.push(fechaFormat);
    arrPxQAcumBase.push(PxQAcumBase.toFixed(0));
    arrPxQAcumActual.push(PxQAcumActual.toFixed(0));
    arrPxQBase.push(PxQBase.toFixed(0));
    arrPxQActual.push(PxQActual.toFixed(0) - PxQBase.toFixed(0));
  };

  // Calculo el mejor máximo para el eje Y
  let chartMax = 0;
  let ii = 1;
  while (chartMax < PxQAcumActual) {
    for (k = 1; k < 10; k++) {
      chartMax = ii * k;
      if (chartMax > PxQAcumActual) {
        break;
      };
    };
    ii = ii * 10;
  };

  let difAcum = PxQAcumActual.toFixed(0) - PxQAcumBase.toFixed(0);
  let porcAcum = (difAcum * 100 / PxQAcumActual.toFixed(0)).toFixed(0);

  let datosEvol = {
    "PxQAcumBase": PxQAcumBase.toFixed(0),
    "PxQAcumActual": PxQAcumActual.toFixed(0),
    "difAcum": difAcum,
    "porcAcum": porcAcum,
    "lblFechas": lblFechas,
    "arrPxQAcumBase": arrPxQAcumBase,
    "arrPxQAcumActual": arrPxQAcumActual,
    "arrPxQBase": arrPxQBase,
    "arrPxQActual": arrPxQActual,
    "chartMax": chartMax
  };

  return datosEvol;
};

function cargaPrductos(heads, lista) {
  let nne = heads;
  // let prodNNE = "";
  // let prodDemon = "";
  // let prodModelo = "";
  // let prodDesc = "";

  //let nneJson = ChartHeaders; //el JSON ChartHeaders está en el archivo ChartHeaders.js
  for (i = 0; i < nne.length; i++) {
    let nombreNNE = getNombreNNE(nne[i].NNE);


    // if (nne[i].NNE == null) {
    //   prodNNE = "";
    // } else {
    //   prodNNE = nne[i].NNE;
    // };
    // if (nne[i].Denominacion == null) {
    //   prodDemon = "";
    // } else {
    //   prodDemon = nne[i].Denominacion;
    // };
    // if (nne[i].Modelo == null) {
    //   prodModelo = "";
    // } else {
    //   prodModelo = nne[i].Modelo;
    // };
    // if (nne[i].Descripcion == null) {
    //   prodDesc = "";
    // } else {
    //   prodDesc = nne[i].Descripcion;
    // };

    let opt = document.createElement("option");
    // opt.setAttribute("value", prodNNE + " - " + prodDemon + " " + prodModelo + " " + prodDesc);
    // opt.innerHTML = prodNNE + " - " + prodDemon + " " + prodModelo + " " + prodDesc;
    opt.setAttribute("value", nombreNNE.nne + " - " + nombreNNE.denominacion + " " + nombreNNE.modelo + " " + nombreNNE.descripcion);
    opt.innerHTML = nombreNNE.nne + " - " + nombreNNE.denominacion + " " + nombreNNE.modelo + " " + nombreNNE.descripcion;

    opt.setAttribute("id", nne[i].NNE);

    // opt.innerHTML = prodNNE;
    lista.appendChild(opt);
  };

};

function getMedianaNNE(nne) {
  let componentes = detalle.filter(function(det) {
    return det.NNE == nne;
  });

  let indexMin = 0;
  let indexMax = 0;
  let valorMin = 0;
  let valorMax = 0;
  let dateMin = "";
  let dateMax = "";
  pP1Actual = 0;
  pP1Inicial = 0;
  pP2Actual = 0;
  pP2Inicial = 0;
  diasDesdeBase = 0;

  for (i = 0; i < componentes.length; i++) {
    if (i == 0) {
      valorMin = componentes[0].Mediana;
      valorMax = componentes[0].Mediana;
      dateMin = componentes[0].Fecha;
      dateMax = componentes[0].Fecha;
      indexMin = i;
      indexMax = i;
      pP1Inicial = componentes[0].PrecioP1;
      pP2Inicial = componentes[0].PrecioP2;
      pP1Actual = componentes[0].PrecioP1;
      pP2Actual = componentes[0].PrecioP2;
      diasDesdeBase = componentes[0].DiasDesdeBase;
    } else {
      if (componentes[i].Fecha < dateMin) {
        dateMin = componentes[i].Fecha;
        indexMin = i;
        valorMin = componentes[i].Mediana;
        pP1Inicial = componentes[i].PrecioP1;
        pP2Inicial = componentes[i].PrecioP2;
      };
      if (componentes[i].Fecha > dateMax) {
        dateMax = componentes[i].Fecha;
        indexMax = i;
        valorMax = componentes[i].Mediana;
        pP1Actual = componentes[i].PrecioP1;
        pP2Actual = componentes[i].PrecioP2;
        diasDesdeBase = componentes[i].DiasDesdeBase;
      };
    };
  };

  let medianas = {
    "valorMin": valorMin,
    "valorMax": valorMax,
    "pP1Inicial": pP1Inicial,
    "pP1Actual": pP1Actual,
    "pP2Inicial": pP2Inicial,
    "pP2Actual": pP2Actual
  };
  return medianas;
};

function getConsumosNNE(nne) {
  let heads = getCabeceraNNE(nne);

  let componentes = detalle.filter(function(det) {
    return det.NNE == nne;
  });

  let basal = [];
  let dif = [];

  let indexMin = 0;
  let indexMax = 0;
  let valorMin = 0;
  let valorMax = 0;
  let dateMin = "";
  let dateMax = "";
  pP1Actual = 0;
  pP1Inicial = 0;
  pP2Actual = 0;
  pP2Inicial = 0;
  diasDesdeBase = 0;
  QtPeriod = 0;
  QP1Period = 0;
  QP2Period = 0;

  for (i = 0; i < componentes.length; i++) {
    if (i == 0) {
      valorMin = componentes[0].Mediana;
      valorMax = componentes[0].Mediana;
      dateMin = componentes[0].Fecha;
      dateMax = componentes[0].Fecha;
      indexMin = i;
      indexMax = i;
      pP1Inicial = componentes[0].PrecioP1;
      pP2Inicial = componentes[0].PrecioP2;
      pP1Actual = componentes[0].PrecioP1;
      pP2Actual = componentes[0].PrecioP2;
      diasDesdeBase = componentes[0].DiasDesdeBase;
      QtPeriod = componentes[0].QT;
      QP1Period = componentes[0].QP1;
      QP2Period = componentes[0].QP2;
    } else {
      if (componentes[i].Fecha < dateMin) {
        dateMin = componentes[i].Fecha;
        indexMin = i;
        valorMin = componentes[i].Mediana;
        pP1Inicial = componentes[i].PrecioP1;
        pP2Inicial = componentes[i].PrecioP2;
      };
      if (componentes[i].Fecha > dateMax) {
        dateMax = componentes[i].Fecha;
        indexMax = i;
        valorMax = componentes[i].Mediana;
        pP1Actual = componentes[i].PrecioP1;
        pP2Actual = componentes[i].PrecioP2;
        diasDesdeBase = componentes[i].DiasDesdeBase;
        // QtPeriod = componentes[i].QT;
        // QP1Period = componentes[i].QP1;
        // QP2Period = componentes[i].QP2;
        QtPeriod = ((heads[0].QAnualTotal * componentes[i].DiasDesdeBase) / 365).toFixed(0);
        QP1Period = ((heads[0].QAnualP1 * componentes[i].DiasDesdeBase) / 365).toFixed(0);
        QP2Period = ((heads[0].QAnualP2 * componentes[i].DiasDesdeBase) / 365).toFixed(0);
      };
    };
  };

  let consumos = {
    "QAnualTotal": heads[0].QAnualTotal,
    "QtPeriod": QtPeriod,
    "QAnualP1": heads[0].QAnualP1,
    "QP1Period": QP1Period,
    "QAnualP2": heads[0].QAnualP2,
    "QP2Period": QP2Period
  };
  return consumos;

};

function seleccionaProducto(lista, criterio) {
  let nneSelected = "";
  let options = lista.options;
  for (i = 0; i < options.length; i++) {
    if (criterio === options[i].value) {
      nneSelected = options[i].id;
      break;
    };
  };
  return nneSelected;
};

function getCabeceraNNE(nne) {
  let heads = cabeceras.filter(function(h) {
    return h.NNE == nne;
  });
  return heads;
}

function difFecha(d1, d2) {
  // let date1 = new Date('4/13/2020');
  // let date2 = new Date('4/22/2020');
  let diffTime = Math.abs(d2 - d1);
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

function getTecla(e) {
  return e.keyCode;
};

function limpiaTxt(control) {
  control.value = "";
  // control.focus();
};

function setCookie(nne) {
  let cook = "nne=" + encodeURIComponent(nne) + "; max-age=31536000; path=./; SameSite=Lax";
  document.cookie = cook;
};

function getCookie(key) {
  if (document.cookie.split(';').some((item) => item.trim().startsWith(key + "="))) {
    //Si la cookie existe devuelvo el valor
    let cookieValue = decodeURIComponent(document.cookie
      .split('; ')
      .find(row => row.startsWith(key + "="))
      .split('=')[1]);
    return cookieValue;
  } else {
    //Si la cookie no existe dvuelvo ""
    return "";
  };
};

function sumarDiasMDY(fecha, dias) {
  fecha = new Date(fecha);
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
};

function randomGrey() {
  var x = Math.floor(Math.random() * 256);
  var bgColor = "rgb(" + x + "," + x + "," + x + ")";
  return bgColor;
};

function legendComDisplay(chart, btnToggle, cantCom) {
  // let chart = grafComJuntos;
  // Mayor a 44 comerciales
  if (cantCom > 22) {
    if (screen.width < 1288) {
      ocultaEtiquetas(chart, btnToggle);
    } else {
      muestraEtiquetas(chart, btnToggle);
    };
  } else {
    if (screen.width < 800) {
      ocultaEtiquetas(chart, btnToggle);
    } else {
      muestraEtiquetas(chart, btnToggle);
    };
  };
};

function muestraEtiquetas(chart, btnToggle) {
  chart.options.legend.display = true;
  chart.update();
  btnToggle.innerText = "Ocultar referencias";
};

function ocultaEtiquetas(chart, btnToggle) {
  chart.options.legend.display = false;
  chart.update();
  btnToggle.innerText = "Mostrar referencias";
};

function toggleLabel(chart, btnToggle) {
  if (chart.options.legend.display === true) {
    ocultaEtiquetas(chart, btnToggle);
  } else {
    muestraEtiquetas(chart, btnToggle);
  };
};

function downloadChart(a, chart) {
  var image = chart.toDataURL("image/png").replace("image/png", "image/octet-stream");
  a.setAttribute("href", image);
  //download.setAttribute("download","archive.png");
};

function getMedianas(nne) {
  // Extraigo sólo las Fechas de las Bases Kairos
  let fechasMulti = detalle.map((det) => det.Fecha);

  // Elimino duplicados de fevchas y me quedo con una sola fecha por base Kairos
  let fechas = fechasMulti.filter(function(value, index, self) {
    return self.indexOf(value) === index;
  });

  // Ordeno el array por fecha de la BD de Kairos
  fechas.sort(function(x, y) {
    return Number(x.Fecha) - Number(y.Fecha);
  });

  let arrFechasOrig = [];
  let lblFechas = [];
  let arrDeArrValores = [];
  let arrMedianas = [];

  // Recorro las bases Kairos
  for (i = 0; i < fechas.length; i++) {
    let arrValores = [];

    // Traigo los NNE de esa Base Kairos
    let medianaDetalle = detalle.filter(function(medNNE) {
      return medNNE.Fecha == fechas[i] && medNNE.NNE == nne;
    });

    // Traigo los Comerciales de esta base de Kairos que coincidan con este NNE y que hayan sido considerados para el cálculo de la Mediana
    let comValores = productosComerciales.filter(function(comPrec) {
      return comPrec.Fecha == fechas[i] && comPrec.NNE == nne && comPrec.Considerado == 1;
    });
    for (j = 0; j < comValores.length; j++) {
      arrValores.push(comValores[j].PrecPubUni);
    };

    let fechaFormat = new Date(fechas[i].substr(4, 2) + "/" + fechas[i].substr(6, 2) + "/" + fechas[i].substr(0, 4)).toLocaleDateString("es-AR");

    arrFechasOrig.push(fechas[i]);
    lblFechas.push(fechaFormat);
    arrDeArrValores.push(arrValores);
    arrMedianas.push(medianaDetalle[0].Mediana);
  };
  let objMedianas = {
    NNE: nne,
    fechas: lblFechas,
    fechasOrig: arrFechasOrig,
    comerciales: arrDeArrValores,
    medianas: arrMedianas
  };
  return objMedianas;
};

function getNombreNNE(nne) {

  let nneFila = getCabeceraNNE(nne);

  // // Traigo los NNE de esa Base Kairos
  // let nneFila = heads.filter(function(medNNE) {
  //   return medNNE.NNE == nne;
  // });

  let prodNNE = "";
  let prodDemon = "";
  let prodModelo = "";
  let prodDesc = "";

  //let nneJson = ChartHeaders; //el JSON ChartHeaders está en el archivo ChartHeaders.js
  // for (i = 0; i < nne.length; i++) {
  if (nneFila[0].NNE == null) {
    prodNNE = "";
  } else {
    prodNNE = nneFila[0].NNE;
  };
  if (nneFila[0].Denominacion == null) {
    prodDemon = "";
  } else {
    prodDemon = nneFila[0].Denominacion;
  };
  if (nneFila[0].Modelo == null) {
    prodModelo = "";
  } else {
    prodModelo = nneFila[0].Modelo;
  };
  if (nneFila[0].Descripcion == null) {
    prodDesc = "";
  } else {
    prodDesc = nneFila[0].Descripcion;
  };

  let objNombreNNE = {
    nne: prodNNE,
    denominacion: prodDemon,
    modelo: prodModelo,
    descripcion: prodDesc
  };

  return objNombreNNE;
};

function getComercialesXnneYFecha(date, nne) {

  //Traigo los comerciales asociados al NNE
  let comercXnne = productosComerciales.filter(function(c) {
    return c.NNE == nne && c.Fecha == date;
  });

  //Si el PrecPubUni es nulo le pong ""
  for (i = 0; i < comercXnne.length; i++) {
    if (comercXnne[i].PrecPubUni) {
      // comercXnne[i].PrecPubUni = comercXnne[i].PrecPubUni.toLocaleString("es-AR");
      comercXnne[i].PrecPubUni = comercXnne[i].PrecPubUni;
    } else {
      comercXnne[i].PrecPubUni = "";
    }

  };

  //Ordeno el array por fecha
  comercXnne.sort(function(x, y) {
    return Number(x.Fecha) - Number(y.Fecha);
  });

  return comercXnne;
};

function getComercialesXnneUnicos(nne) {

  //Traigo los comerciales asociados al NNE
  let com = productosComerciales.filter(function(c) {
    return c.NNE == nne;
  });

  //Acoto el objeto a los campos básicos de cada Comercial
  let comAcotados = com.map(function(cadaCom) {
    let objComAcotados = {
      NNE: cadaCom.NNE,
      CodCombinado: cadaCom.CodCombinado,
      CodCABA: cadaCom.CodCABA,
      Comercial: cadaCom.Comercial,
      Laboratorio: cadaCom.Laboratorio
    };
    return objComAcotados;
  });

  //Elimino duplicados
  let comUnicos = quitaDuplicadosJSON(comAcotados);

  return comUnicos;
};

function getComercialesXCodComb(cod) {

  //Traigo los comerciales asociados al NNE
  let com = productosComerciales.filter(function(c) {
    return c.CodCombinado == cod;
  });

  //Quito los "null"
  let comSN = quitaNullJSON(com);

  //Elimino duplicados
  let comUnicos = quitaDuplicadosJSON(comSN);

  // Ordeno el array por fecha de la BD de Kairos
  comUnicos.sort(function(x, y) {
    return Number(x.Fecha) - Number(y.Fecha);
  });

  return comUnicos;
};

function getComercialesTodos() {
  let com = productosComerciales.map(function(comerc) {
    let objCom = {
      NNE: comerc.NNE,
      CodCombinado: comerc.CodCombinado,
      Unidades: comerc.Unidades,
      Comercial: comerc.Comercial,
      Laboratorio: comerc.Laboratorio
    };
    return objCom;
  });

  //Saco los "null" y los reemplazo por ""
  let comSN = quitaNullJSON(com);

  //Saco los duplicados
  let comSD = quitaDuplicadosJSON(comSN);

  // for (i=0; i<comSD.length; i++){
  //   let claves = Object.keys(comSD[i]);
  //   for (j = 0; j < claves.length; j++) {
  //     let clave = claves[j];
  //     if (comSD[i][clave] == null) {
  //       comSD[i][clave] = "";
  //     };
  //   };
  // };
  //
  // return comSD;
  return comSD;
};

function quitaNullJSON(jsonConNull) {
  let jsonSN = jsonConNull;
  //Saco los "null" y los reemplazo por ""
  for (i = 0; i < jsonSN.length; i++) {
    let claves = Object.keys(jsonSN[i]);
    for (j = 0; j < claves.length; j++) {
      let clave = claves[j];
      if (jsonSN[i][clave] == null) {
        jsonSN[i][clave] = "";
      };
    };
  };
  return jsonSN;
};

function quitaDuplicadosJSON(paramJson) {
  //Sólo funciona con JSON con dos dimensiones
  let sinDuplicados = [];
  let flag = 0;

  //Parseo el JSON
  let elJson = JSON.parse(JSON.stringify(paramJson));

  //Recorro el array de objetos con i
  for (i = 0; i < elJson.length; i++) {
    //Al primer objeto siempre lo guardo en el array de salida
    if (i == 0) {
      sinDuplicados.push(elJson[i]);
    } else {
      //A partir del segundo objeto comparo todos los objetos del JSON original
      //con los objetos que ya guardé en el array de salida y si no existe lo incorporo
      //Para eso recorro el array de salida que tengo hasta ahora
      for (k = 0; k < sinDuplicados.length; k++) {
        flag = 0;
        //Obtengo los nombres de las claves del objeto
        let claves = Object.keys(elJson[i]);
        for (j = 0; j < claves.length; j++) {
          let clave = claves[j];
          //Comparo campo por campo de los dos objetos
          if (elJson[i][clave] != sinDuplicados[k][clave]) {
            //Si tiene al menos un campo diferente salgo porque ya se que no es igual
            flag = 1;
            break;
          };
        };
        //Si los campos son todos iguales salgo del loop,
        //no lo guardo y voy por el próximo objeto del JSON
        if (flag == 0) {
          break;
        };
      };
      //Si es distinto a todos los objetos del array de salida lo incorporo al mismo
      if (flag == 1) {
        sinDuplicados.push(elJson[i]);
      };
    };
  };
  return sinDuplicados;
};

function getObjGenericos() {

  let headers = cabeceras.map(function(head) {
    // Esto lo hago para cambiar el 'null' del JSON por un string vacío
    let denom = "";
    let mod = "";
    let desc = "";
    let objMediana = getMedianaNNE(head.NNE);
    let medianaBasal = "";
    let medianaActual = "";
    let porc = "";
    let precioComarsaBasal = "";
    let precioComarsaActual = "";
    let precioVaraderoBasal = "";
    let precioVaraderoActual = "";

    if (head.Denominacion != null) {
      denom = head.Denominacion;
    };

    if (head.Modelo != null) {
      mod = head.Modelo;
    };

    if (head.Descripcion != null) {
      desc = head.Descripcion;
    };

    if (head.MedianaBase != null) {
      medianaBasal = head.MedianaBase.toLocaleString("es-AR");
    };

    if (objMediana.valorMax != null) {
      medianaActual = objMediana.valorMax.toLocaleString("es-AR");
    };

    if (head.MedianaBase != null && objMediana.valorMax != null) {
      porc = (((objMediana.valorMax - head.MedianaBase) * 100) / head.MedianaBase);
      porc = Number(porc).toFixed(1);
      porc = Number(porc).toLocaleString("es-AR");
    };


    if (head.PrecioPropuestoP1 != null) {
      precioComarsaBasal = head.PrecioPropuestoP1.toLocaleString("es-AR");
    };

    if (objMediana.pP1Actual != null) {
      precioComarsaActual = objMediana.pP1Actual.toLocaleString("es-AR");
    };

    if (head.PrecioPropuestoP2 != null) {
      precioVaraderoBasal = head.PrecioPropuestoP2.toLocaleString("es-AR");
    };

    if (objMediana.pP2Actual) {
      precioVaraderoActual = objMediana.pP2Actual.toLocaleString("es-AR");
    };

    // Inserto los valores en el objeto
    let objHeader = {
      nne: head.NNE,
      descripcion: denom + " " + mod + " " + desc,
      medianaBasal: medianaBasal,
      medianaActual: medianaActual,
      porc: porc,
      precioComarsaBasal: precioComarsaBasal,
      precioComarsaActual: precioComarsaActual,
      precioVaraderoBasal: precioVaraderoBasal,
      precioVaraderoActual: precioVaraderoActual,
      comercialComarsa: head.CodCABAP1,
      comercialVaradero: head.CodCABAP2,
      QTotal: head.QAnualTotal,
      QComarsa: head.QAnualP1,
      QVaradero: head.QAnualP2
    };
    return objHeader;
  });

  // Ordeno el array de cabeceras por Nombre del Genérico
  headers.sort(function(x, y) {
    return Number(x.descripcion) - Number(y.descripcion);
  });

  return headers;
};

function getObjMedianas(nne) {
  //Traigo sólo los registros de las medianas del NNE correspondiente
  let tmpMedianas = detalle.filter(function(det) {
    return det.NNE == nne;
  });

  //Traigo sólo el NNE, las fechas y las medianas
  let mapMedianas = tmpMedianas.map(function(head) {
    objTemp = {
      NNE: head.NNE,
      fechaOrig: head.Fecha,
      Fecha: stringToDate(head.Fecha),
      Mediana: formatComercialConsiderado(head.Mediana, 1, 0)
    };
    return objTemp;
  });

  //Ordeno los registros por fecha
  let orderMedianas = mapMedianas.sort(function(x, y) {
    return Number(x.Fecha) - Number(y.Fecha);
  });

  return orderMedianas;
};

function stringToDate(string) {
  let dia = string.substr(6, 2);
  let mes = string.substr(4, 2);
  let ano = string.substr(0, 4);
  let fecha = new Date(mes + "/" + dia + "/" + ano);
  fecha = fecha.toLocaleDateString("es-AR");
  return fecha;
};

function stringGuionesToDate(string) {
  //Ej: 2020-12-02
  let dia = string.substr(8, 2);
  let mes = string.substr(5, 2);
  let ano = string.substr(0, 4);
  let fecha = new Date(mes + "/" + dia + "/" + ano);
  fecha = fecha.toLocaleDateString("es-AR");
  return fecha;
};

function limpiaTabla(tabla) {
  tabla.bootstrapTable('destroy').bootstrapTable({
    height: 550,
    locale: "es-AR",
    data: [],
    columns: []
  });
};

function detailFormatter(index, row) {
  var html = []
  $.each(row, function(key, value) {
    html.push('<p><b>' + key + ':</b> ' + value + '</p>')
  })
  return html.join('')
};

function formatComercialConsiderado(valor, considerado, causa) {
  let elHTML = "";
  if (valor) {
    //Cambio el separador de decimales de puntos a comas
    let conComa = valor.toLocaleString("es-AR");

    elHTML = '<span>' + conComa + '</span>';
    if (considerado == 0) {
      elHTML += '&nbsp;&nbsp;&nbsp;&nbsp;<span class="right badge badge-danger" data-toggle="tooltip" title="' + causa + '">X</span>';
    };
  };
  return elHTML;
};

function formatoPrecioMediana(value, row, index) {
  let elHTML = "";
  if (value) {
    //Cambio el separador de decimales de puntos a comas
    let conComa = value.toLocaleString("es-AR");

    elHTML = '<span>' + conComa + '</span>';
    if (row.Considerado == 0) {
      elHTML += '&nbsp;&nbsp;&nbsp;&nbsp;<span class="right badge badge-danger" data-toggle="tooltip" title="' + row.Causa + '">X</span>';
    };
  };
  return elHTML;
};

function formatoAdmin(value, row, index) {
  let admin = '<p>Usuario</p>';
  if (value == 2) {
    admin = '<p><b>Administrador</b></p>';
  };
  return admin;
};

function formatoCeroUno(value, row, index){
  let activo = '<p style="color:red">Inhabilitado</p>';
  if (value == 1) {
    activo = '<p style="color:rgb(45, 199, 51)">Activo</p>';
  };
  return activo;
};

function operateFormatterUsuarios(value, row, index) {
  let htmlNNE = [];
  if(JSON.parse(JSON.stringify(row)).activo == 1){
    htmlNNE = [
      '<a class="mx-1" id="id' + JSON.parse(JSON.stringify(row)).id + '" name="' + JSON.parse(JSON.stringify(row)).id + '" href="../edituser/' + JSON.parse(JSON.stringify(row)).id + '" role="button" data-toggle="tooltip" title="Editar usuario">',
      '<i class="fa fa-edit"></i>',
      '</a>  ',
      '<a class="mx-1" name="Inhabilita' + JSON.parse(JSON.stringify(row)).nne + '" href="../inactive/' + JSON.parse(JSON.stringify(row)).id + '" role="button" data-toggle="tooltip" title="Inhabilitar">',
      '<i class="fa fa-times"></i>'
    ].join('');
  } else {
    htmlNNE = [
      '<a class="mx-1" id="id' + JSON.parse(JSON.stringify(row)).id + '" name="' + JSON.parse(JSON.stringify(row)).id + '" href="../edituser/' + JSON.parse(JSON.stringify(row)).id + '" role="button" data-toggle="tooltip" title="Editar usuario">',
      '<i class="fa fa-edit"></i>',
      '</a> ',
      '<a class="mx-1" name="Habilita' + JSON.parse(JSON.stringify(row)).nne + '" href="../active/' + JSON.parse(JSON.stringify(row)).id + '" role="button" data-toggle="tooltip" title="Habilitar">',
      '<i class="fa fa-check"></i>',
      '</a> '
    ].join('');
  };
  return htmlNNE;
};

function operateFormatterMedianaGeneral(value, row, index) {
  let htmlNNE = [
    // '<a class="like mx-1" href="javascript:void(0)" title="Evolución de las medianas">',
    '<a id="id' + JSON.parse(JSON.stringify(row)).nne + '" name="' + JSON.parse(JSON.stringify(row)).nne + '" class="btnchart mx-1" href="#modalMEdianas" role="button" data-toggle="modal" data-toggle="tooltip" title="Boxplot de las medianas">',
    '<i class="fa fa-chart-line"></i>',
    '</a>  ',

    '<a class="tblmedianas mx-1" name="' + JSON.parse(JSON.stringify(row)).nne + '" href="#modalTblMediana" title="Evolución de las medianas" data-toggle="modal">',
    '<i class="fa fa-sort-amount-up"></i>',
    '</a> ',

    '<a class="tblcomerciales mx-1" name="' + JSON.parse(JSON.stringify(row)).nne + '" href="#modalTbl" title="Comerciales involucrados" data-toggle="modal">',
    '<i class="fa fa-prescription"></i>',
    '</a>'
  ].join('');
  return htmlNNE;
};

function operateFormatterComerciales(value, row, index) {
  let htmlNNE = [
    // '<a class="like mx-1" href="javascript:void(0)" title="Evolución de las medianas">',
    '<a class="chrtCom mx-1" id="id' + JSON.parse(JSON.stringify(row)).CodCABA + '" name="' + JSON.parse(JSON.stringify(row)).CodCABA + '" href="#modalComerciales" role="button" data-toggle="modal" data-toggle="tooltip" title="Composición de la mediana">',
    '<i class="fa fa-chart-line"></i>',
    '</a>  '
  ].join('');
  return htmlNNE;
};

////////////////////// -----   CHARTS  ------ //////////////////////////

function actualizaChartData(chart) {
  //Limpio el gráfico
  let arrData = chart.data.datasets;
  for (i = 0; i < chart.data.datasets.length; i++) {
    chart.data.datasets[i].data = [];
  };
  chart.update();

  datosFechas = getFechas();
  let porc = datosFechas.porc;

  let resto = 0;
  if (porc != null) {
    resto = 100 - porc;
  }

  let data = [porc, resto];
  chart.data.datasets[0].data = data;
  chart.options.title.text = chart.options.title.text + porc + "%";
  chart.update();
};

function actualizaChartPxQContrato(chart) {

  //Limpio el gráfico
  let arrData = chart.data.datasets;
  for (i = 0; i < chart.data.datasets.length; i++) {
    chart.data.datasets[i].data = [];
  };
  chart.update();

  let datosEvol = getDatosEvol();
  chart.data.labels = datosEvol.lblFechas;
  chart.data.datasets[0].data = datosEvol.arrPxQAcumBase;
  chart.data.datasets[1].data = datosEvol.arrPxQAcumActual;
  chart.data.datasets[2].data = datosEvol.arrPxQBase;
  chart.data.datasets[3].data = datosEvol.arrPxQActual;


  // Establezco el máximo para cada eje Y
  chart.options.scales.yAxes[0].ticks.max = datosEvol.chartMax;
  chart.options.scales.yAxes[1].ticks.max = datosEvol.chartMax;
  chart.update();

};

function actualizaChartBoxPlotMedianas(chart, nne) {

  //Limpio el gráfico
  let arrData = chart.data.datasets;
  for (i = 0; i < chart.data.datasets.length; i++) {
    chart.data.datasets[i].data = [];
  };
  chart.update();

  chart.data.labels = [];
  chart.data.datasets[0].data = [];
  chart.data.datasets[1].data = [];

  let objDatos = getMedianas(nne);

  chart.options.title.text += nne;
  // chart.data.labels = lblFechas;
  chart.data.labels = objDatos.fechas;
  // chart.data.datasets[0].data = arrDeArrValores;
  chart.data.datasets[0].data = objDatos.comerciales;
  // chart.data.datasets[1].data = arrMedianas;
  chart.data.datasets[1].data = objDatos.medianas;
  chart.update();
};

function actualizaChartQxNNE(chart, nne) {
  //Limpio el gráfico
  let arrData = chart.data.datasets;
  for (i = 0; i < chart.data.datasets.length; i++) {
    chart.data.datasets[i].data = [];
  };
  chart.update();

  let consumos = getConsumosNNE(nne)

  let QP1Period = consumos.QP1Period;
  let QP2Period = consumos.QP2Period;

  let QP1P = 0;
  let QP2P = 0;
  if (QP1Period != null) {
    QP1P = QP1Period;
  };
  if (QP2Period != null) {
    QP2P = QP2Period;
  };


  let data = [QP1P, QP2P];
  chart.data.datasets[0].data = data; //[QP1Period, QP2Period];

  let title = "Participación de proveedores en el consumo - NNE: " + nne;
  chart.options.title.text = title; //"Participación de proveedores en el consumo - NNE: " + nne;
  chart.options.title.display = true;
  chart.update();
};

function actualizaChartPrecios(chart, nne) {
  //Limpio el gráfico
  let arrData = chart.data.datasets;
  for (i = 0; i < chart.data.datasets.length; i++) {
    chart.data.datasets[i].data = [];
  };
  chart.update();

  let componentes = detalle.filter(function(det) {
    return det.NNE == nne;
  });

  let medianas = [];
  let pP1 = [];
  let pP2 = [];

  for (i = 0; i < componentes.length; i++) {
    // Establezco la Fecha para el eje X
    let date = componentes[i].Fecha;
    let dia = date.substr(6, 2);
    let mes = date.substr(4, 2);
    let ano = date.substr(0, 4);
    fecha = new Date(mes + "/" + dia + "/" + ano).toLocaleDateString("es-AR");

    let med = {
      // x: componentes[i].DiasDesdeBase,
      x: fecha,
      y: componentes[i].Mediana
    };
    medianas.push(med);

    let p1 = {
      // x: componentes[i].DiasDesdeBase,
      x: fecha,
      y: componentes[i].PrecioP1
    };
    pP1.push(p1);

    let p2 = {
      // x: componentes[i].DiasDesdeBase,
      x: fecha,
      y: componentes[i].PrecioP2
    };
    pP2.push(p2);
  };
  chart.data.datasets[0].data = medianas;
  chart.data.datasets[1].data = pP1;
  chart.data.datasets[2].data = pP2;
  chart.options.title.text = "Evolución de precios - NNE: " + nne;
  // tituloMediana.innerHTML = "Evolución de Precios - NNE: " + nne;
  chart.update();
};

function actualizaChartComparativa(chart, nne) {
  //Limpio el gráfico
  let arrData = chart.data.datasets;
  for (i = 0; i < chart.data.datasets.length; i++) {
    chart.data.datasets[i].data = [];
  };
  chart.update();

  let componentes = detalle.filter(function(det) {
    return det.NNE == nne;
  });

  let basal = [];
  let dif = [];

  let indexMin = 0;
  let indexMax = 0;
  let valorMin = 0;
  let valorMax = 0;
  let dateMin = "";
  let dateMax = "";

  for (i = 0; i < componentes.length; i++) {
    if (i == 0) {
      valorMin = componentes[0].Mediana;
      valorMax = componentes[0].Mediana;
      dateMin = componentes[0].Fecha;
      dateMax = componentes[0].Fecha;
    } else {
      if (componentes[i].Fecha < dateMin) {
        dateMin = componentes[i].Fecha;
        indexMin = i;
        valorMin = componentes[i].Mediana;
      };
      if (componentes[i].Fecha > dateMax) {
        dateMax = componentes[i].Fecha;
        indexMax = i;
        valorMax = componentes[i].Mediana;
      };
    };
  };

  let difValor = valorMax - valorMin;
  difValor = difValor.toFixed(2);

  if (difValor > 0) {
    basal = [valorMin, valorMin];
  } else {
    basal = [valorMin, valorMax];
  };

  dif = [0, difValor];
  chart.data.datasets[0].data = basal;
  chart.data.datasets[1].data = dif;
  chart.options.title.text = "Comparativa medianas - NNE: " + nne;

  chart.update();
};

function actualizaChartComxProv(chart, nne) {
  //Limpio el gráfico
  let arrData = chart.data.datasets;
  for (i = 0; i < chart.data.datasets.length; i++) {
    chart.data.datasets[i].data = [];
  };
  chart.update();

  //Traigo los comerciales entregados por cada Proveedor
  let cabecs = cabeceras.filter(function(cabNNE) {
    return cabNNE.NNE == nne;
  });

  let comP1_1 = cabecs[0].CodCABAP1;
  let comP1_2 = cabecs[0].CodCABAP1_2;
  let comP2_1 = cabecs[0].CodCABAP2;
  let comP2_2 = cabecs[0].CodCABAP2_2;

  //Principal Comarsa
  if (comP1_1 != null) {
    //Obtengo todos los registros del comercial principal entregado por Comarsa
    let comercialesP1_1 = productosComerciales.filter(function(detNNE) {
      return detNNE.CodCABA == comP1_1;
    });

    if (comercialesP1_1.length) {
      // Ordeno el array por fecha de la BD de Kairos
      comercialesP1_1.sort(function(x, y) {
        return Number(x.Fecha) - Number(y.Fecha);
      });

      let puntos = [];
      // Armo los pares de coordenadas
      for (comercialP1_1 of comercialesP1_1) {
        // Establezco la Fecha para el eje X
        let date = comercialP1_1.Fecha;
        let dia = date.substr(6, 2);
        let mes = date.substr(4, 2);
        let ano = date.substr(0, 4);
        let fecha = new Date(mes + "/" + dia + "/" + ano).toLocaleDateString("es-AR");

        let pares = {
          //x: comerc.DiasDesdeBase,
          x: fecha,
          y: comercialP1_1.PrecPubUni
        };
        // Inserto el nuevo par
        puntos.push(pares);

      };

      let legend = "(Entrega Comarsa) " + comercialesP1_1[0].Comercial;
      let labChart = {
        label: legend,
        data: puntos,
        lineTension: 0,
        borderColor: colorComarsa1,
        backgroundColor: colorComarsa2
      };
      chart.data.datasets.push(labChart);
    }
  };

  //Secundario Comarsa
  if (comP1_2 != null) {
    //Obtengo todos los registros del comercial secundario entregado por Comarsa
    let comercialesP1_2 = productosComerciales.filter(function(detNNE) {
      return detNNE.CodCABA == comP1_2;
    });

    if (comercialesP1_2.length) {
      // Ordeno el array por fecha de la BD de Kairos
      comercialesP1_2.sort(function(x, y) {
        return Number(x.Fecha) - Number(y.Fecha);
      });

      let puntos = [];
      // Armo los pares de coordenadas
      for (comercialP1_2 of comercialesP1_2) {
        // Establezco la Fecha para el eje X
        let date = comercialP1_2.Fecha;
        let dia = date.substr(6, 2);
        let mes = date.substr(4, 2);
        let ano = date.substr(0, 4);
        let fecha = new Date(mes + "/" + dia + "/" + ano).toLocaleDateString("es-AR");

        let pares = {
          //x: comerc.DiasDesdeBase,
          x: fecha,
          y: comercialP1_2.PrecPubUni
        };
        // Inserto el nuevo par
        puntos.push(pares);

      };

      let legend = "(Entrega Comarsa) " + comercialesP1_2[0].Comercial;
      let labChart = {
        label: legend,
        data: puntos,
        lineTension: 0,
        borderColor: colorComarsa1,
        backgroundColor: colorComarsa2
      };
      chart.data.datasets.push(labChart);
    }
  };


  //Primario Varadero
  if (comP2_1 != null) {
    //Obtengo todos los registros del comercial principal entregado por Varadero
    let comercialesP2_1 = productosComerciales.filter(function(detNNE) {
      return detNNE.CodCABA == comP2_1;
    });

    if (comercialesP2_1.length) {
      // Ordeno el array por fecha de la BD de Kairos
      comercialesP2_1.sort(function(x, y) {
        return Number(x.Fecha) - Number(y.Fecha);
      });

      let puntos = [];
      // Armo los pares de coordenadas
      for (comercialP2_1 of comercialesP2_1) {
        // Establezco la Fecha para el eje X
        let date = comercialP2_1.Fecha;
        let dia = date.substr(6, 2);
        let mes = date.substr(4, 2);
        let ano = date.substr(0, 4);
        let fecha = new Date(mes + "/" + dia + "/" + ano).toLocaleDateString("es-AR");

        let pares = {
          //x: comerc.DiasDesdeBase,
          x: fecha,
          y: comercialP2_1.PrecPubUni
        };
        // Inserto el nuevo par
        puntos.push(pares);

      };

      legend = "(Entrega Varadero) " + comercialesP2_1[0].Comercial;
      let labChart = {
        label: legend,
        data: puntos,
        lineTension: 0,
        borderColor: colorVaradero1,
        backgroundColor: colorVaradero2
      };
      chart.data.datasets.push(labChart);

    }
  };

  //Secundario Varadero
  if (comP2_2 != null) {
    //Obtengo todos los registros del comercial principal entregado por Varadero
    let comercialesP2_2 = productosComerciales.filter(function(detNNE) {
      return detNNE.CodCABA == comP2_2;
    });

    if (comercialesP2_2.length) {
      // Ordeno el array por fecha de la BD de Kairos
      comercialesP2_2.sort(function(x, y) {
        return Number(x.Fecha) - Number(y.Fecha);
      });

      let puntos = [];
      // Armo los pares de coordenadas
      for (comercialP2_2 of comercialesP2_2) {
        // Establezco la Fecha para el eje X
        let date = comercialP2_2.Fecha;
        let dia = date.substr(6, 2);
        let mes = date.substr(4, 2);
        let ano = date.substr(0, 4);
        let fecha = new Date(mes + "/" + dia + "/" + ano).toLocaleDateString("es-AR");

        let pares = {
          //x: comerc.DiasDesdeBase,
          x: fecha,
          y: comercialP2_2.PrecPubUni
        };
        // Inserto el nuevo par
        puntos.push(pares);

      };

      legend = "(Entrega Varadero) " + comercialesP2_2[0].Comercial;
      let labChart = {
        label: legend,
        data: puntos,
        lineTension: 0,
        borderColor: colorVaradero1,
        backgroundColor: colorVaradero2
      };
      chart.data.datasets.push(labChart);
    }
  };

  chart.update();

};

function actualizaChartComparativaPxQxProd(chart, nne) {
  //Limpio el gráfico
  let arrData = chart.data.datasets;
  for (i = 0; i < chart.data.datasets.length; i++) {
    chart.data.datasets[i].data = [];
  };
  chart.update();

  // Obtengo el NNE de todas las bases Kairos
  let componentesPxQxP = detalle.filter(function(detPxQxP) {
    return detPxQxP.NNE == nne;
  });

  // Ordeno el array por fecha de la BD de Kairos
  componentesPxQxP.sort(function(x, y) {
    return Number(x.Fecha) - Number(y.Fecha);
  });

  // Defino las variables a usar para construir el gráfico
  let acumT = 0;
  let acum1 = 0;
  let acum2 = 0;
  let puntosT = [];
  let puntos1 = [];
  let puntos2 = [];
  let barras = [];
  let paresT = {};
  let pares1 = {};
  let pares2 = {};

  // Recoro los NNE y obtengo el PxQ de cada base Kairos y el acumulado
  for (compPxQxP of componentesPxQxP) {
    // Establezco la Fecha para el eje X
    let date = compPxQxP.Fecha;
    let dia = date.substr(6, 2);
    let mes = date.substr(4, 2);
    let ano = date.substr(0, 4);
    let fecha = new Date(mes + "/" + dia + "/" + ano);

    // Establezco como punto x el fin de la vigencia de la base Kairos en cuestión
    fecha = sumarDiasMDY(fecha, compPxQxP.Dias);
    fecha = fecha.toLocaleDateString("es-AR");

    acumT = (Number(acumT) + Number(compPxQxP.PxQ)).toFixed(2);
    acum1 = (Number(acum1) + Number(compPxQxP.P1xQ1)).toFixed(2);
    acum2 = (Number(acum2) + Number(compPxQxP.P2xQ2)).toFixed(2);

    if (compPxQxP.PxQ != null) {
      paresT = {
        //x: comerc.DiasDesdeBase,
        x: fecha,
        y: acumT
      };
    }
    if (compPxQxP.P1xQ1 != null) {
      pares1 = {
        //x: comerc.DiasDesdeBase,
        x: fecha,
        y: acum1
      };
    }
    if (compPxQxP.P2xQ2 != null) {
      pares2 = {
        //x: comerc.DiasDesdeBase,
        x: fecha,
        y: acum2
      };
    }
    // Inserto el nuevo par
    puntosT.push(paresT);
    puntos1.push(pares1);
    puntos2.push(pares2);
  };

  // Inserto los tres datasets al chart
  // Total
  let legendT = "Total";
  let labChartT = {
    label: legendT,
    data: puntosT,
    lineTension: 0,
    borderColor: colorMedianaK1,
    backgroundColor: colorMedianaK2
  };
  chart.data.datasets.push(labChartT);

  // Comarsa
  let legend1 = "Comarsa";
  let labChart1 = {
    label: legend1,
    data: puntos1,
    lineTension: 0,
    borderColor: colorComarsa1,
    backgroundColor: colorComarsa2
  };
  chart.data.datasets.push(labChart1);

  // Varadero
  let legend2 = "Varadero";
  let labChart2 = {
    label: legend2,
    data: puntos2,
    lineTension: 0,
    borderColor: colorVaradero1,
    backgroundColor: colorVaradero2
  };
  chart.data.datasets.push(labChart2);

  chart.update();
};

function actualizaChartComercialesJuntos(chart, nne) {
  //Limpio el gráfico
  let arrData = chart.data.datasets;
  for (i = 0; i < chart.data.datasets.length; i++) {
    chart.data.datasets[i].data = [];
  };
  chart.update();

  //Obtengo todos los comerciales que intervienen en el precio de este NNE
  let comercialesNNE = productosComerciales.filter(function(detNNE) {
    return detNNE.NNE == nne;
  });

  //Traigo los comerciales entregados por cada Proveedor
  let cabecs = cabeceras.filter(function(cabNNE) {
    return cabNNE.NNE == nne;
  });
  let comP1_1 = cabecs[0].CodCABAP1;
  let comP1_2 = cabecs[0].CodCABAP1_2;
  let comP2_1 = cabecs[0].CodCABAP2;
  let comP2_2 = cabecs[0].CodCABAP2_2;

  //Armo un array sólo con los CodCABA distintos
  let comercialesUnicos = [...new Set(comercialesNNE.map(data => data.CodCABA))];

  //Creo los labels para el chart
  for (i = 0; i < comercialesUnicos.length; i++) {
    //Creo un array de comerciales con el CodCABA y la Descripción
    let comercs = comercialesNNE.filter(function(detComerc) {
      return detComerc.CodCABA == comercialesUnicos[i];
    });

    //Inserto los puntos
    let puntos = [];
    for (comerc of comercs) {
      // Establezco la Fecha para el eje X
      let date = comerc.Fecha;
      let dia = date.substr(6, 2);
      let mes = date.substr(4, 2);
      let ano = date.substr(0, 4);
      fecha = new Date(mes + "/" + dia + "/" + ano).toLocaleDateString("es-AR");

      let pares = {
        //x: comerc.DiasDesdeBase,
        x: fecha,
        y: comerc.PrecPubUni
      };
      puntos.push(pares);
    };
    // let color1 = randomColor();
    // let color2 = randomColor();
    let color1 = randomGrey();
    let color2 = randomGrey();
    let legend = comercs[0].Comercial;

    //Si es un comercial de los que entregan los proveedores los pinnto de un color (no gris)
    //Pregunto por ambos, después sólo por Comarsa y después sólo por Vatadero
    //Si no cumple pinto la línea de gris
    if ((comercs[0].CodCABA == comP1_1 || comercs[0].CodCABA == comP1_2) &&
      (comercs[0].CodCABA == comP2_1 || comercs[0].CodCABA == comP2_2)) {
      color1 = "rgba(65, 0, 148, 0.8)";
      color2 = "rgba(175, 27, 219, 1)";
      legend = "(Entrega C y V) " + comercs[0].Comercial;
    } else {
      if (comercs[0].CodCABA == comP1_1 || comercs[0].CodCABA == comP1_2) {
        color1 = colorComarsa1;
        color2 = colorComarsa2;
        legend = "(Entrega Comarsa) " + comercs[0].Comercial;
      } else {
        if (comercs[0].CodCABA == comP2_1 || comercs[0].CodCABA == comP2_2) {
          color1 = colorVaradero1;
          color2 = colorVaradero2;
          legend = "(Entrega Varadero) " + comercs[0].Comercial;
        }
      }
    };

    let labChart = {
      label: legend,
      data: puntos,
      lineTension: 0,
      borderColor: color1,
      backgroundColor: color2
    };
    // Calculo la cantida de comerciales únicos involucrados en el precio de este NNE
    cantCom = i + 1;
    chart.data.datasets.push(labChart);
  };
  chart.update();
};

function actualizaChartComercialUnico(chart, codCaba) {
  //Limpio el gráfico
  let arrData = chart.data.datasets;
  for (i = 0; i < chart.data.datasets.length; i++) {
    chart.data.datasets[i].data = [];
  };
  chart.update();

  //Obtengo todos los comerciales que intervienen en el precio de este NNE
  let comercialesCodCaba = productosComerciales.filter(function(detNNE) {
    return detNNE.CodCABA == codCaba;
  });

  //Inserto los puntos
  let puntos = [];
  for (comerc of comercialesCodCaba) {
    // Establezco la Fecha para el eje X
    let date = comerc.Fecha;
    let dia = date.substr(6, 2);
    let mes = date.substr(4, 2);
    let ano = date.substr(0, 4);
    fecha = new Date(mes + "/" + dia + "/" + ano).toLocaleDateString("es-AR");

    let pares = {
      //x: comerc.DiasDesdeBase,
      x: fecha,
      y: comerc.PrecPubUni
    };
    puntos.push(pares);
  };

  let legend = comercialesCodCaba[0].Comercial;

  let labChart = {
    label: legend,
    data: puntos,
    lineTension: 0
  };

  chart.data.datasets.push(labChart);

  chart.update();
};

function actualizaChartComercialUnicoComb(chart, codComb) {
  //Limpio el gráfico
  let arrData = chart.data.datasets;
  for (i = 0; i < chart.data.datasets.length; i++) {
    chart.data.datasets[i].data = [];
  };
  chart.update();

  //Obtengo todos los comerciales que intervienen en el precio de este NNE
  let comercialesCodCaba = productosComerciales.filter(function(detNNE) {
    return detNNE.CodCombinado == codComb;
  });

  //Inserto los puntos
  let puntos = [];
  for (comerc of comercialesCodCaba) {
    // Establezco la Fecha para el eje X
    let date = comerc.Fecha;
    let dia = date.substr(6, 2);
    let mes = date.substr(4, 2);
    let ano = date.substr(0, 4);
    fecha = new Date(mes + "/" + dia + "/" + ano).toLocaleDateString("es-AR");

    let pares = {
      //x: comerc.DiasDesdeBase,
      x: fecha,
      y: comerc.PrecPubUni
    };
    puntos.push(pares);
  };

  let legend = comercialesCodCaba[0].Comercial;

  let labChart = {
    label: legend,
    data: puntos,
    lineTension: 0
  };

  chart.data.datasets.push(labChart);

  chart.update();
};

////////////////////// -----   /CHARTS  ------ //////////////////////////

////////////////////// -----   TABLAS  ------ //////////////////////////

function construyeTablaUsuarios() {
  let tblUsuariosTemp = {
    height: 550,
    locale: "es-AR",
    data: [],
    columns: [
      [
        // {
        //   field: 'state',
        //   checkbox: true,
        //   // rowspan: 2,
        //   align: 'center',
        //   valign: 'middle'
        // },
        {
          field: 'id',
          title: 'ID',
          // rowspan: 2,
          align: 'left',
          // valign: 'middle',
          sortable: true
          // footerFormatter: totalTextFormatter
        },
        {
          field: 'nombre',
          title: 'Nombre',
          // rowspan: 2,
          align: 'left',
          // valign: 'middle',
          sortable: true
          // footerFormatter: totalTextFormatter
        },
        {
          field: 'usuario',
          title: 'Usuario',
          sortable: true,
          // footerFormatter: totalNameFormatter,
          align: 'left'
        },
        {
          field: 'email',
          title: 'Correo Electrónico',
          sortable: true,
          align: 'left'
          // formatter: formatoCash,
          // footerFormatter: totalPriceFormatter
        },
        {
          field: 'rol',
          title: 'Rol',
          sortable: true,
          align: 'left',
          formatter: formatoAdmin,
          // footerFormatter: totalPriceFormatter
        },
        {
          field: 'activo',
          title: 'Activo',
          sortable: true,
          align: 'left',
          formatter: formatoCeroUno
          // footerFormatter: totalPriceFormatter
        },
        {
          field: 'operate',
          title: 'Acciones',
          align: 'center',
          clickToSelect: false,
          events: window.operateEvents,
          formatter: operateFormatterUsuarios
        }
      ]
    ]
  };

  return tblUsuariosTemp;
};


function construyeTablaMedianas() {
  let tblMedianaTemp = {
    height: 550,
    locale: "es-AR",
    data: [],
    columns: [
      [
        // {
        //   field: 'state',
        //   checkbox: true,
        //   // rowspan: 2,
        //   align: 'center',
        //   valign: 'middle'
        // },
        {
          field: 'nne',
          title: 'NNE',
          // rowspan: 2,
          align: 'center',
          // valign: 'middle',
          sortable: true
          // footerFormatter: totalTextFormatter
        },
        {
          field: 'descripcion',
          title: 'Descripción',
          sortable: true,
          // footerFormatter: totalNameFormatter,
          align: 'left'
        }, {
          field: 'medianaBasal',
          title: 'Mediana Basal $',
          sortable: true,
          align: 'center'
          // formatter: formatoCash,
          // footerFormatter: totalPriceFormatter
        }, {
          field: 'medianaActual',
          title: 'Mediana Actual $',
          sortable: true,
          align: 'center'
          // formatter: formatoCash,
          // footerFormatter: totalPriceFormatter
        }, {
          field: 'porc',
          title: 'Diferencia %',
          sortable: true,
          align: 'center'
          // formatter: formatoCash,
          // footerFormatter: totalPriceFormatter
        }, {
          field: 'operate',
          title: 'Gráficos y Reportes',
          align: 'center',
          clickToSelect: false,
          events: window.operateEvents,
          formatter: operateFormatterMedianaGeneral
        }, {
          field: 'precioComarsaBasal',
          title: 'Comarsa Basal $',
          sortable: true,
          align: 'center',
          formatter: formatComercialConsiderado
          // footerFormatter: totalPriceFormatter
        }, {
          field: 'precioComarsaActual',
          title: 'Comarsa Actual $',
          sortable: true,
          align: 'center',
          formatter: formatComercialConsiderado
          // footerFormatter: totalPriceFormatter
        }, {
          field: 'precioVaraderoBasal',
          title: 'Varadero Basal $',
          sortable: true,
          align: 'center',
          formatter: formatComercialConsiderado
          // footerFormatter: totalPriceFormatter
        }, {
          field: 'precioVaraderoActual',
          title: 'Varadero Actual $',
          sortable: true,
          align: 'center',
          formatter: formatComercialConsiderado
          // footerFormatter: totalPriceFormatter
        }
      ]
    ]
  };

  let data = getObjGenericos();

  //Recorro los NNE y les agrego las columnas con las medianas
  for (j = 0; j < data.length; j++) {
    //Traigo las mdianas de cada NNE
    let med = detalle.filter(function(c) {
      return c.NNE == data[j].nne;
    });

    // Ordeno el array de Medianas por la fecha de las BD
    med.sort(function(x, y) {
      return Number(x.Fecha) - Number(y.Fecha);
    });

    //Recorro cada base Kairos y extraigo la fecha para la cabecera de la columna y la mediana para el dato
    for (i = 0; i < med.length; i++) {

      //Creo una columna de precio por cada BD Kairos
      if (j == 0) {
        tblMedianaTemp.columns[0].push({
          field: med[i].Fecha,
          title: "Mediana " + stringToDate(med[i].Fecha),
          sortable: true,
          align: 'center'
          // formatter: formatoPrecioMediana,
          // footerFormatter: totalPriceFormatter
        });
      };

      //Ingreso el valor de la mediana
      data[j][med[i].Fecha] = formatComercialConsiderado(med[i].Mediana, 1, 0);
    };

  };
  tblMedianaTemp.data = data;
  return tblMedianaTemp;
};


function construyeTablaComernciales(nne) {

  let tbl = {
    height: 550,
    locale: "es-AR",
    data: [],
    columns: [
      // [
      // {
      //   field: 'state',
      //   checkbox: true,
      //   // rowspan: 2,
      //   align: 'center',
      //   valign: 'middle'
      // },
      {
        field: 'NNE',
        title: 'NNE',
        // rowspan: 2,
        align: 'center',
        // valign: 'middle',
        sortable: true,
        // footerFormatter: totalTextFormatter
      },
      {
        field: 'CodCombinado',
        title: 'Código',
        sortable: true,
        // footerFormatter: totalNameFormatter,
        align: 'left'
      }, {
        field: 'Comercial',
        title: 'Descripcion',
        sortable: true,
        align: 'center',
        // formatter: formatoCash,
        // footerFormatter: totalPriceFormatter
      },
      {
        field: 'Laboratorio',
        title: 'Laboratorio',
        sortable: true,
        align: 'center',
        // formatter: formatoCash,
        // footerFormatter: totalPriceFormatter
      }
      // ,{
      //   field: 'operate',
      //   title: 'Accionessss',
      //   align: 'center',
      //   clickToSelect: false,
      //   events: window.operateEvents,
      //   // formatter: operateFormatterComerciales
      // }
    ]
    // ]
  };

  //Traigo los comerciales asociados al NNE
  let com = productosComerciales.filter(function(c) {
    return c.NNE == nne;
  });

  //Acoto el objeto a los campos básicos de cada Comercial
  let comAcotados = com.map(function(cadaCom) {
    let objComAcotados = {
      NNE: cadaCom.NNE,
      CodCombinado: cadaCom.CodCombinado,
      CodCABA: cadaCom.CodCABA,
      Comercial: cadaCom.Comercial,
      Laboratorio: cadaCom.Laboratorio
    };
    return objComAcotados;
  });

  //Elimino duplicados
  let comUnicos = quitaDuplicadosJSON(comAcotados);

  // Ordeno el array de Comerciales por la fecha de las BD
  com.sort(function(x, y) {
    return Number(x.Fecha) - Number(y.Fecha);
  });

  //Recorro cada Comercial
  for (i = 0; i < comUnicos.length; i++) {
    //Traigo los comerciales asociados al NNE
    let com2 = productosComerciales.filter(function(c) {
      return c.CodCombinado == comUnicos[i].CodCombinado;
    });
    //Por cada Comercial recorro las entradas de cada BD Kairos
    for (k = 0; k < com2.length; k++) {
      //Creo una columna de precio por cada BD Kairos
      if (i == 0) {
        tbl.columns.push({
          field: com2[k].Fecha,
          title: stringToDate(com2[k].Fecha),
          sortable: true,
          align: 'center',
          // formatter: formatoPrecioMediana,
          // footerFormatter: totalPriceFormatter
        });

      };
      //Si coincide el comercial genero un campo nuevo en la tabla y le asigno el precio
      if (comUnicos[i].CodCombinado == com2[k].CodCombinado) {
        //Inserto el valor
        // comUnicos[i][com2[k].Fecha] = com2[k].PrecPubUni;
        comUnicos[i][com2[k].Fecha] = formatComercialConsiderado(com2[k].PrecPubUni, com2[k].Considerado, com2[k].Causa);

      };
    };
  };
  tbl.data = comUnicos;
  return tbl;
};

function construyeTablaEvolComernciales(codComb) {

  let tbl = {
    height: 550,
    locale: "es-AR",
    data: [],
    columns: [
      // [
      // {
      //   field: 'state',
      //   checkbox: true,
      //   // rowspan: 2,
      //   align: 'center',
      //   valign: 'middle'
      // },
      {
        field: 'CodCombinado',
        title: 'Código',
        sortable: true,
        // footerFormatter: totalNameFormatter,
        align: 'left'
      }, {
        field: 'Fecha',
        title: 'Fecha',
        sortable: true,
        align: 'center',
        formatter: stringToDate,
        // footerFormatter: totalPriceFormatter
      },
      {
        field: 'PrecPubUni',
        title: 'Precio por Unidad',
        sortable: true,
        align: 'center',
        formatter: formatoPrecioMediana,
        // footerFormatter: totalPriceFormatter
      }
      // ,{
      //   field: 'operate',
      //   title: 'Acciones',
      //   align: 'center',
      //   clickToSelect: false,
      //   events: window.operateEvents,
      //   // formatter: operateFormatterComerciales
      // }
    ]
    // ]
  };

  let data = getComercialesXCodComb(codComb);

  tbl.data = data;
  return tbl;
};

////////////////////// -----   /TABLAS  ------ //////////////////////////
