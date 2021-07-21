window.addEventListener('load', function() {

  // Obtengo las fuentes de datos
  let cabeceras = Headers;
  let detalle = Detalle;
  let productosComerciales = Comerciales;

  let datosFechas = getFechas();

  let diasTranscurridos = datosFechas.diasTranscurridos;
  let porc = datosFechas.porc;

  let diasPeriodo = document.getElementById("diasPeriodoEvol");
  if (diasTranscurridos != null) {
    diasPeriodo.innerHTML = diasTranscurridos + " días";
  } else {
    diasPeriodo.innerHTML = "";
  };

  let porcPeriodo = document.getElementById("propPeriodoPorcEvol");
  if (porc != null) {
    porcPeriodo.innerHTML = porc + "%";
  } else {
    porcPeriodo.innerHTML = "";
  };

  let datosEvol = getDatosEvol();

  let proyectado = document.getElementById("PxQProyectadoEvol");
  if (datosEvol.PxQAcumBase != null) {
    proyectado.innerHTML = new Intl.NumberFormat('es-AR').format(datosEvol.PxQAcumBase);
  } else {
    proyectado.innerHTML = "";
  };

  let obtenido = document.getElementById("PxQObtenidoEvol");
  if (datosEvol.PxQAcumActual != null) {
    obtenido.innerHTML = new Intl.NumberFormat('es-AR').format(datosEvol.PxQAcumActual);
  } else {
    obtenido.innerHTML = "";
  };

  let difGasto = document.getElementById("difGastoEvol");
  if (datosEvol.difAcum != null) {
    difGasto.innerHTML = new Intl.NumberFormat('es-AR').format(datosEvol.difAcum);
  } else {
    difGasto.innerHTML = "";
  };

  let difPorc = document.getElementById("difPorcEvol");
  if (datosEvol.porcAcum != null) {
    difPorc.innerHTML = datosEvol.porcAcum + "%";
  } else {
    difPorc.innerHTML = "";
  };

  let chartElementContrato = document.getElementById('chartPxQContrato');
  actualizaChartPxQContrato(getChartPxQContrato(chartElementContrato));

  let chartPxQContratoBtnDwnld = document.getElementById("chartPxQContratoBtnDwnld");
  chartPxQContratoBtnDwnld.addEventListener('click', function(){downloadChart(chartPxQContratoBtnDwnld, chartElementContrato)});

  let chartPxQContratoBtn = document.getElementById("chartPxQContratoBtn");
  chartPxQContratoBtn.addEventListener('click', muestraModal2, false);

  function muestraModal2(){
    // let cardPorc = document.getElementById("porcPeriodTextModal");
    // cardPorc.innerText = porc + "%";
    setTimeout(function(){
      let chartPxQContratoModal = document.getElementById("chartPxQContratoModal");
      actualizaChartPxQContrato(getChartPxQContrato2(chartPxQContratoModal));
      let chartPxQContratoBtnDwnldModal = document.getElementById("chartPxQContratoBtnDwnldModal");
      chartPxQContratoBtnDwnldModal.addEventListener('click', function(){downloadChart(chartPxQContratoBtnDwnldModal, chartPxQContratoModal)});
    }, 500);
  };

});
