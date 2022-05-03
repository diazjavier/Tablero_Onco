window.addEventListener('load', function() {
  window.addEventListener('resize', legendComDisplay);
  let cantCom = 0;

  let buscador = document.getElementById("txtBuscador");
  let buscador2 = document.getElementById("txtBuscador2");
  let listado = document.getElementById("productos");
  let listado2 = document.getElementById("productos2");
  let btnSearch = document.getElementById("btnSearch");
  let btnSearch2 = document.getElementById("btnSearch2");
  let btnClear = document.getElementById("btnClear");
  let lblAlert = document.getElementById("lblAlert");

  let lblNomebreNNE = document.getElementById("nombreNNE");
  lblNomebreNNE.innerHTML = "";

  let lblModeloNNE = document.getElementById("modeloNNE");
  lblModeloNNE.innerHTML = "";

  let fechaInicial = document.getElementById("fechaInicial");
  fechaInicial.innerHTML = "";

  // Obtengo las fuentes de datos
  let cabeceras = Headers;
  console.log("Entro a cabeceras");
  let detalle = Detalle;
  let productosComerciales = Comerciales;
  // Cargo el combo de Productos
  cargaPrductos(cabeceras);
  // Cargo los datos generales del contrato
  cargaDatosIniciales();
  //
  // let btnToggleLabelContrato = document.getElementById("btnToggleLabelContrato");
  // btnToggleLabelContrato.addEventListener('click', toggleLabel);

  let btnToggleLabel = document.getElementById("btnToggleLabel");
  btnToggleLabel.addEventListener('click', toggleLabel);

  // Inicializo algunas variables que voy a usar en más de una función
  let pP1Actual = 0;
  let pP1Inicial = 0;
  let pP2Actual = 0;
  let pP2Inicial = 0;
  let diasDesdeBase = 0;
  let QtPeriod = 0;
  let QP1Period = 0;
  let QP2Period = 0;

  let colorMedianaK1 = "rgba(252, 170, 10, 0.7)";
  let colorMedianaK2 = "rgba(252, 170, 10, 1)";
  let colorComarsa1 = "rgba(47, 75, 193, 0.7)";
  let colorComarsa2 = "rgba(47, 75, 193, 1)";
  let colorVaradero1 = "rgba(50, 193, 47, 0.7)";
  let colorVaradero2 = "rgba(50, 193, 47, 1)";
  let colorCyV1 = "rgba(65, 0, 148, 0.8)";
  let colorCyV2 = "rgba(175, 27, 219, 1)";

  // let tituloMediana = document.getElementById("medianaTitle");
  // let tituloComerciales = document.getElementById("comercialesTitle");

  function cargaDatosIniciales() {
    let chart = chartPxQContrato;
    let chartPorc = chartPorcPeriodo;


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

    chart.data.labels = lblFechas;
    chart.data.datasets[0].data = arrPxQAcumBase;
    chart.data.datasets[1].data = arrPxQAcumActual;
    chart.data.datasets[2].data = arrPxQBase;
    chart.data.datasets[3].data = arrPxQActual;

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

    // Establezco el máximo para cada eje Y
    chart.options.scales.yAxes[0].ticks.max = chartMax;
    chart.options.scales.yAxes[1].ticks.max = chartMax;
    chart.update();

    // Datos de Fechas
    let inicioDelPeriodo = document.getElementById("inicioDelPeriodo");
    if (dateMin != null) {
      inicioDelPeriodo.innerHTML = new Date(dateMin.substr(4, 2) + "/" + dateMin.substr(6, 2) + "/" + dateMin.substr(0, 4)).toLocaleDateString("es-AR");
    } else {
      inicioDelPeriodo.innerHTML = "";
    };


    let diasContrato = document.getElementById("diasContrato");
    if (dateMin != null) {
      diasContrato.innerHTML = "365";
    };

    let fechaInicial = document.getElementById("fechaInicial");
    console.log(dateMin);
    if (dateMin != null) {
      fechaInicial.innerHTML = new Date(dateMin.substr(4, 2) + "/" + dateMin.substr(6, 2) + "/" + dateMin.substr(0, 4)).toLocaleDateString("es-AR");
    } else {
      fechaInicial.innerHTML = "";
    };

    let fechaFinal = document.getElementById("fechaFinal");
    if (dateMax != null) {
      fechaFinal.innerHTML = new Date(dateMax.substr(4, 2) + "/" + dateMax.substr(6, 2) + "/" + dateMax.substr(0, 4)).toLocaleDateString("es-AR");
    } else {
      fechaFinal.innerHTML = "";
    };

    // let finDelPeroiodo = document.getElementById("finDelPeroiodo");
    // let finDelPeroiodo = document.getElementById("fechaFinal");
    // if (dateMin != null) {
    //   let newDateP = new Date(dateMin.substr(4, 2) + "/" + dateMin.substr(6, 2) + "/" + dateMin.substr(0, 4));
    //   console.log("La fecha Fin es: "+newDateP.setDate(newDateP.getDate() + 364).toLocaleDateString("es-AR"));
    //   newDateP.setDate(newDateP.getDate() + 364);
    //   finDelPeroiodo.innerHTML = newDateP.toLocaleDateString("es-AR");
    // } else {
    //   finDelPeroiodo.innerHTML = "";
    // };

    let diasPeriodo = document.getElementById("diasPeriodo");
    if (diasTranscurridos != null) {
      diasPeriodo.innerHTML = diasTranscurridos + " días";
    } else {
      diasPeriodo.innerHTML = "";
    };

    let propPeriodoPorc = document.getElementById("propPeriodoPorc");
    if (diasTranscurridos != null) {
      propPeriodoPorc.innerHTML = ((diasTranscurridos * 100) / 365).toFixed(0).toString().replace('.', ',') + "%";
    } else {
      propPeriodoPorc.innerHTML = "";
    };

    let porc = 0;
    if (diasTranscurridos != null) {
      porc = (diasTranscurridos * 100) / 365;
    };

    // let progressBarPeriodo = document.getElementById("progressBarPeriodo");
    // if (diasTranscurridos != null) {
    //   progressBarPeriodo.setAttribute("aria-valuenow", (porc.toFixed(1).toString().replace('.', ',')));
    //   progressBarPeriodo.setAttribute("style", "width: " + porc + "%");
    // } else {
    //   progressBarPeriodo.setAttribute("aria-valuenow", "0");
    //   progressBarPeriodo.setAttribute("style", "width: 0%");
    // };


    let cardPorc = document.getElementById("porcPeriodText");
    cardPorc.innerText = porc + "%"
    let resto = 100 - porc;
    chartPorc.data.datasets[0].data = [porc, resto];
    chartPorc.update();

  };


  function seleccionaProducto() {
    console.log("busca!");
    let nneSelected = "";
    let options = listado.options;

    for (i = 0; i < options.length; i++) {
      if (buscador.value === options[i].value) {
        nneSelected = options[i].id;
        break;
      };
    };
    if (nneSelected == "") {
      // alert("No se encontraron resultados para este criterio de búsqueda");
      limpiaTxt();
      lblAlert.innerHTML = "<div class='alert alert-danger alert-dismissible fade show' role='alert'>" +
        "<p><strong>No se encontraron resultados para este criterio de búsqueda</strong></p> <p>Intente nuevamente</p>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
        "<span aria-hidden='true'>&times;</span>" +
        "</button>" +
        "</div>";
      // location.reload();
    } else {
      lblAlert.innerHTML = "";
      actualizaDatos(nneSelected);
      actualizaCharts(nneSelected);
      limpiaTxt();
    };
  };

  function actualizaTitulo(nne) {
    let cabecera = cabeceras.filter(function(cab) {
      return cab.NNE == nne;
    });
  };

  //////////////////////////////////////////////////////////////

  function actualizaDatos(nne) {
    let heads = cabeceras.filter(function(h) {
      return h.NNE == nne;
    });

    let lblNom = "";
    let lblMod = "";
    let lblDesc = "";

    if (heads[0].Denominacion != null) {
      lblNom = heads[0].Denominacion;
    };

    if (heads[0].Modelo != null) {
      lblMod = heads[0].Modelo;
    };

    if (heads[0].Descripcion != null) {
      lblDesc = heads[0].Descripcion;
    };

    //Actualizo el título de la pantalla con el nombre del medicamento
    lblNomebreNNE.innerHTML = nne + " - " + lblNom + " " + lblMod;
    lblModeloNNE.innerHTML = lblDesc;

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

    // Datos de Medianas
    let medianaActual = document.getElementById("medianaActual");
    if (valorMax != null) {
      medianaActual.innerHTML = "$" + valorMax.toString().replace('.', ',') + ".-";
    } else {
      medianaActual.innerHTML = "";
    };

    let medianaInicial = document.getElementById("medianaInicial");
    if (valorMin != null) {
      medianaInicial.innerHTML = "$" + valorMin.toString().replace('.', ',') + ".-";
    } else {
      medianaInicial.innerHTML = "";
    };

    let difPesos = document.getElementById("difPesos");
    if (valorMin != null && valorMax != null) {
      difPesos.innerHTML = "$" + (valorMax - valorMin).toFixed(2).toString().replace('.', ',') + ".-";
    } else {
      difPesos.innerHTML = "";
    };

    let difPorc = document.getElementById("difPorc");
    if (valorMin != null && valorMax != null) {
      difPorc.innerHTML = (((valorMax - valorMin) * 100) / valorMin).toFixed(2).toString().replace('.', ',') + "%";
    } else {
      difPorc.innerHTML = "";
    };

    let progressBarMed = document.getElementById("progressBarMed");
    porc = 0;
    if (diasDesdeBase != null) {
      porc = ((valorMax - valorMin) * 100) / valorMin;
      progressBarMed.setAttribute("aria-valuenow", (porc.toFixed(1).toString().replace('.', ',')));
      progressBarMed.setAttribute("style", "width: " + porc + "%");
    } else {
      progressBarMed.setAttribute("aria-valuenow", "0");
      progressBarMed.setAttribute("style", "width: 0%");
    };

    // Datos de Precios de Proveedores
    let precioP1Actual = document.getElementById("precioP1Actual");
    if (pP1Actual != null) {
      precioP1Actual.innerHTML = "$" + pP1Actual.toString().replace('.', ',') + ".-";
    } else {
      precioP1Actual.innerHTML = "";
    };

    let precioP1Inicial = document.getElementById("precioP1Inicial");
    if (pP1Inicial != null) {
      precioP1Inicial.innerHTML = "$" + pP1Inicial.toString().replace('.', ',') + ".-";
    } else {
      precioP1Inicial.innerHTML = "";
    };

    let precioP2Actual = document.getElementById("precioP2Actual");
    if (pP2Actual != null) {
      precioP2Actual.innerHTML = "$" + pP2Actual.toString().replace('.', ',') + ".-";
    } else {
      precioP2Actual.innerHTML = "";
    };

    let precioP2Inicial = document.getElementById("precioP2Inicial");
    if (pP2Inicial != null) {
      precioP2Inicial.innerHTML = "$" + pP2Inicial.toString().replace('.', ',') + ".-";
    } else {
      precioP2Inicial.innerHTML = "";
    };

    // Datos de Q (Consumo)
    let QtAnual = document.getElementById("QtAnual");
    QtAnual.innerHTML = heads[0].QAnualTotal;

    let QDelPeriodo = document.getElementById("QDelPeriodo");
    QDelPeriodo.innerHTML = QtPeriod;

    let QtAnualP1 = document.getElementById("QtAnualP1");
    QtAnualP1.innerHTML = heads[0].QAnualP1;

    let QDelPeriodoP1 = document.getElementById("QDelPeriodoP1");
    QDelPeriodoP1.innerHTML = QP1Period;

    let QtAnualP2 = document.getElementById("QtAnualP2");
    QtAnualP2.innerHTML = heads[0].QAnualP2;

    let QDelPeriodoP2 = document.getElementById("QDelPeriodoP2");
    QDelPeriodoP2.innerHTML = QP2Period;
  };
  //////////////////////////////////////////////////////////////

  function actualizaCharts(nne) {
    let cabecera = cabeceras.filter(function(cab) {
      return cab.NNE == nne;
    });

    let denominacion = "";
    let modelo = "";
    let descripcion = "";

    if (cabecera[0].Denominacion != null) {
      denominacion = cabecera[0].Denominacion;
    };

    if (cabecera[0].Modelo != null) {
      modelo = cabecera[0].Modelo;
    };

    if (cabecera[0].Descripcion != null) {
      descripcion = cabecera[0].Descripcion;
    };

    actualizaChartBoxPlotMedianas(boxPlotMedianas, nne);
    actualizaChartPrecios(chartPrecios, nne);
    actualizaChartComparativa(chartComparativa, nne);
    actualizaChartComercialesJuntos(nne);
    actualizaChartQxNNE(nne);
    actualizaChartComxProv(nne);
    actualizaChartComparativaPxQxProd(nne);
  };

  function actualizaChartBoxPlotMedianas(chart, nne) {
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.data.datasets[1].data = [];

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
      lblFechas.push(fechaFormat);
      arrDeArrValores.push(arrValores);
      arrMedianas.push(medianaDetalle[0].Mediana);
    };

    chart.options.title.text += nne;
    chart.data.labels = lblFechas;
    chart.data.datasets[0].data = arrDeArrValores;
    chart.data.datasets[1].data = arrMedianas;
    chart.update();
  };

  function actualizaChartComparativaPxQxProd(nne) {
    let chart = chartComparativaPxQxProd;
    chart.data.datasets = [];

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

  function actualizaChartComxProv(nne) {
    let chart = chartComEnt;
    chart.data.datasets = [];

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

  function actualizaChartQxNNE(nne) {
    let chart = chartQxNNE;
    chart.data.datasets[0].data = [QP1Period, QP2Period];
    chart.options.title.text = "Participación de proveedores en el consumo - NNE: " + nne;
    chart.options.title.display = true;
    chart.update();
  };

  function actualizaChartComercialesJuntos(nne) {
    let chart = grafComJuntos;
    chart.data.datasets = [];
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
    legendComDisplay();
    chart.update();
  };


  function cargaPrductos(heads) {
    let nne = heads;
    let prodNNE = "";
    let prodDemon = "";
    let prodModelo = "";
    let prodDesc = "";
    //let nneJson = ChartHeaders; //el JSON ChartHeaders está en el archivo ChartHeaders.js
    for (i = 0; i < nne.length; i++) {
      if (nne[i].NNE == null) {
        prodNNE = "";
      } else {
        prodNNE = nne[i].NNE;
      };
      if (nne[i].Denominacion == null) {
        prodDemon = "";
      } else {
        prodDemon = nne[i].Denominacion;
      };
      if (nne[i].Modelo == null) {
        prodModelo = "";
      } else {
        prodModelo = nne[i].Modelo;
      };
      if (nne[i].Descripcion == null) {
        prodDesc = "";
      } else {
        prodDesc = nne[i].Descripcion;
      };
      let opt = document.createElement("option");
      opt.setAttribute("value", prodNNE + " - " + prodDemon + " " + prodModelo + " " + prodDesc);
      opt.innerHTML = prodNNE + " - " + prodDemon + " " + prodModelo + " " + prodDesc;

      opt.setAttribute("id", nne[i].NNE);

      // opt.innerHTML = prodNNE;
      listado.appendChild(opt);
    };
    buscador.focus();
  };

  function actualizaChartPrecios(chart, nne) {
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

  function limpiaTxt() {
    console.log("Borra");
    buscador.value = "";
    buscador2.value = "";
    buscador.focus();
  };

  function randomColor() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    return bgColor;
  };

  function randomGrey() {
    var x = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + x + "," + x + ")";
    return bgColor;
  };

  function muestraEtiquetas(chart) {
    chart.options.legend.display = true;
    chart.update();
    btnToggleLabel.innerText = "Ocultar referencias";
  };

  function ocultaEtiquetas(chart) {
    chart.options.legend.display = false;
    chart.update();
    btnToggleLabel.innerText = "Mostrar referencias";
  };

  function toggleLabel() {
    let chart = grafComJuntos;

    if (chart.options.legend.display == true) {
      ocultaEtiquetas(chart);
    } else {
      muestraEtiquetas(chart);
    };
  };

  function legendComDisplay() {
    let chart = grafComJuntos;
    // Mayor a 44 comerciales
    if (cantCom > 22) {
      if (screen.width < 1288) {
        ocultaEtiquetas(chart);
      } else {
        muestraEtiquetas(chart);
      };
    } else {
      if (screen.width < 800) {
        ocultaEtiquetas(chart);
      } else {
        muestraEtiquetas(chart);
      };
    };
  };

  function sumarDiasMDY(fecha, dias) {
    fecha = new Date(fecha);
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  };

  function difFecha(d1, d2) {
    // let date1 = new Date('4/13/2020');
    // let date2 = new Date('4/22/2020');
    let diffTime = Math.abs(d2 - d1);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  function foo(e) {
    console.log("Tecla!");
    if (e.keyCode === 13) {
      seleccionaProducto();
    };
  };

  // actualizaChartPrecios(chartPrecios, nne);
  // actualizaChartComparativa(chartComparativa, nne);
  buscador.addEventListener('keyup', foo, false);
  // buscador.addEventListener('keydown', foo, false);
  // buscador.addEventListener('click', foo, false);
  buscador2.addEventListener('keyup', foo, false);
  // buscador2.addEventListener('click', foo, false);
  btnSearch.addEventListener('click', seleccionaProducto, false);
  btnSearch2.addEventListener('click', seleccionaProducto, false);
  btnClear.addEventListener('click', limpiaTxt, false);
});
