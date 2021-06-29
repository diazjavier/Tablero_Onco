window.addEventListener('load', function() {

  $(function() {
    $('[data-toggle="tooltip"]').tooltip()
  });

  let datosFechas = getFechas();

  let dateMin = datosFechas.dateMin;
  let dateMax = datosFechas.dateMax;
  let fechaMin = datosFechas.fechaMin;
  let fechaMax = datosFechas.fechaMax;
  let diasTranscurridos = datosFechas.diasTranscurridos;
  let porc = datosFechas.porc;

  // Datos de Fechas
  let inicioDelPeriodo = document.getElementById("inicioDelPeriodo");
  if (dateMin != null) {
    inicioDelPeriodo.innerHTML = new Date(dateMin.substr(4, 2) + "/" + dateMin.substr(6, 2) + "/" + dateMin.substr(0, 4)).toLocaleDateString("es-AR");
  } else {
    inicioDelPeriodo.innerHTML = "";
  };


  let diasContrato = document.getElementById("diasContrato");
  if (dateMin != null) {
    diasContrato.innerHTML = "365 días";
  };

  let fechaInicial = document.getElementById("fechaInicial");
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

  let diasPeriodo = document.getElementById("diasPeriodo");
  if (diasTranscurridos != null) {
    diasPeriodo.innerHTML = diasTranscurridos + " días";
  } else {
    diasPeriodo.innerHTML = "";

  };
  let propPeriodoPorc = document.getElementById("propPeriodoPorc");
  if (porc != null) {
    propPeriodoPorc.innerHTML = ((diasTranscurridos * 100) / 365).toFixed(0).toString().replace('.', ',') + "%";
  } else {
    propPeriodoPorc.innerHTML = "";
  };

  // let cardPorc = document.getElementById("porcPeriodText");
  // cardPorc.innerText = porc + "%";

  let chartElement = document.getElementById("chartPorcPeriodo");
  actualizaChartData(chartPorcPeriodo(chartElement));

  let chartPorcPeriodoBtnDwnld = document.getElementById("chartPorcPeriodoBtnDwnld");
  chartPorcPeriodoBtnDwnld.addEventListener('click', function(){downloadChart(chartPorcPeriodoBtnDwnld, chartElement)});

  let chartPorcPeriodoBtn = document.getElementById("chartPorcPeriodoBtn");
  chartPorcPeriodoBtn.addEventListener('click', muestraModal1, false);

  function muestraModal1(){
    // let cardPorc = document.getElementById("porcPeriodTextModal");
    // cardPorc.innerText = porc + "%";
    setTimeout(function(){
      let chartPorcPeriodoModal = document.getElementById("chartPorcPeriodoModal");
      actualizaChartData(chartPorcPeriodo(chartPorcPeriodoModal))
      let chartPorcPeriodoBtnDwnldModal = document.getElementById("chartPorcPeriodoBtnDwnldModal");
      chartPorcPeriodoBtnDwnldModal.addEventListener('click', function(){downloadChart(chartPorcPeriodoBtnDwnldModal, chartPorcPeriodoModal)});
    }, 500);
  };

});
