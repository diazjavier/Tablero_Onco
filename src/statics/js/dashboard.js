window.addEventListener('load', function() {

  let buscador3 = document.getElementById("txtBuscador3");
  // let buscador2 = document.getElementById("txtBuscador2");
  let listado3 = document.getElementById("productos3");
  // let listado2 = document.getElementById("productos2");
  let btnSearch3 = document.getElementById("btnSearch3");
  // let btnSearch2 = document.getElementById("btnSearch2");
  let btnClear3 = document.getElementById("btnClear3");
  let lblAlert3 = document.getElementById("lblAlert3");

  let lblNomebreNNE3 = document.getElementById("nombreNNE3");
  lblNomebreNNE3.innerHTML = "";

  let lblModeloNNE3 = document.getElementById("modeloNNE3");
  lblModeloNNE3.innerHTML = "";


  let cookNne = getCookie("nne");
  if (cookNne && cookNne != "") {
    muestraProducto3(cookNne);
  };

  buscador3.addEventListener('keyup', function(e) {
    if (getTecla(e) === 13) {
      muestraProducto3(seleccionaProducto(listado3, buscador3.value))
    };
  }, false);

  listado3.addEventListener('keyup', function(e) {
    if (getTecla(e) === 13) {
      muestraProducto3(seleccionaProducto(listado3, buscador3.value))
    };
  }, false);

  btnSearch3.addEventListener('click', function() {
    muestraProducto3(seleccionaProducto(listado3, buscador3.value))
  }, false);
  btnClear3.addEventListener('click', function() {
    limpiaTxt(buscador3)
  }, false);

  // let fechaInicial = document.getElementById("fechaInicial");
  // fechaInicial.innerHTML = "";

  // Obtengo las fuentes de datos
  let cabeceras = Headers;
  let detalle = Detalle;
  let productosComerciales = Comerciales;

  // let datosFechas = getFechas();
  // let porc = datosFechas.porc;
  // let cardPorc = document.getElementById("porcPeriodText2");
  // cardPorc.innerText = porc + "%"


  cargaChartPeriodo();

  // Cargo el combo de Productos
  cargaPrductos(cabeceras, listado3);
  buscador3.focus();

  function muestraProducto3(nneSelected) {
    // let nneSelected = seleccionaProducto(listado, buscador.value);
    if (nneSelected == "") {
      // alert("No se encontraron resultados para este criterio de búsqueda");
      limpiaTxt(buscador3);
      lblAlert3.innerHTML = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" +
        "<p><strong>No se encontraron resultados para este criterio de búsqueda</strong></p> <p>Intente nuevamente</p>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
        "<span aria-hidden='true'>&times;</span>" +
        "</button>" +
        "</div>";
      // location.reload();
    } else {
      lblAlert3.innerHTML = "";
      setCookie(nneSelected);
      actualizaDashboardNNE(nneSelected);
      limpiaTxt(buscador3);
    };
  };

  function actualizaDashboardNNE(nne) {

    cargaTitulo(nne);

    cargaChartMediana(nne)

    cargaChartPrecios(nne);

    cargaChartComparativa(nne);

    chartEvolPxProv(nne);

    cargaChartPxQCom(nne);

    cargaChartComercialesJuntos(nne);

  };

  function cargaChartPeriodo() {
    let chartElement = document.getElementById("chartPorcPeriodoDash");
    actualizaChartData(chartPorcPeriodo(chartElement));

    let chartPorcPeriodoBtnDwnldDash = document.getElementById("chartPorcPeriodoBtnDwnldDash");
    chartPorcPeriodoBtnDwnldDash.addEventListener('click', function() {
      downloadChart(chartPorcPeriodoBtnDwnldDash, chartElement)
    });

    let chartPorcPeriodoBtnDash = document.getElementById("chartPorcPeriodoBtnDash");
    chartPorcPeriodoBtnDash.addEventListener('click', muestraModalDash, false);

    function muestraModalDash() {
      setTimeout(function() {
        let chartPorcPeriodoModalDash = document.getElementById("chartPorcPeriodoModalDash");
        actualizaChartData(chartPorcPeriodo(chartPorcPeriodoModalDash))
        let chartPorcPeriodoBtnDwnldModalDash = document.getElementById("chartPorcPeriodoBtnDwnldModalDash");
        chartPorcPeriodoBtnDwnldModalDash.addEventListener('click', function() {
          downloadChart(chartPorcPeriodoBtnDwnldModalDash, chartPorcPeriodoModalDash)
        });
      }, 500);
    };
  };

  function cargaTitulo(nne) {
    let heads = getCabeceraNNE(nne);
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
    lblNomebreNNE3.innerHTML = nne + " - " + lblNom + " " + lblMod;
    lblModeloNNE3.innerHTML = lblDesc;
  };

  function cargaChartMediana(nne) {
    let chartElement2 = document.getElementById("boxplotMedianasDash");
    actualizaChartBoxPlotMedianas(chartBoxPlotMedianas(chartElement2), nne);

    let boxplotMedianasBtnDwnldDash = document.getElementById("boxplotMedianasBtnDwnldDash");
    boxplotMedianasBtnDwnldDash.addEventListener('click', function() {
      downloadChart(boxplotMedianasBtnDwnldDash, chartElement2)
    });

    let boxplotMedianasBtnDash = document.getElementById("boxplotMedianasBtnDash");
    boxplotMedianasBtnDash.addEventListener('click', muestraModal3, false);

    function muestraModal3() {
      // let cardPorc = document.getElementById("porcPeriodTextModal");
      // cardPorc.innerText = porc + "%";
      setTimeout(function() {
        let boxplotMedianasModalDash = document.getElementById("boxplotMedianasModalDash");
        actualizaChartBoxPlotMedianas(chartBoxPlotMedianas(boxplotMedianasModalDash), nne);
        let boxplotMedianasBtnDwnldDashModal = document.getElementById("boxplotMedianasBtnDwnldDashModal");
        boxplotMedianasBtnDwnldDashModal.addEventListener('click', function() {
          downloadChart(boxplotMedianasBtnDwnldDashModal, boxplotMedianasModalDash)
        });
      }, 500);
    };

  };

  function cargaChartPrecios(nne) {

    let chartElement3 = document.getElementById("chartPrecios");
    actualizaChartPrecios(chartEvolucionPrecios(chartElement3), nne);

    let chartPreciosBtnDwnldDash = document.getElementById("chartPreciosBtnDwnldDash");
    chartPreciosBtnDwnldDash.addEventListener('click', function() {
      downloadChart(chartPreciosBtnDwnldDash, chartElement3)
    });

    let chartPreciosBtnDash = document.getElementById("chartPreciosBtnDash");
    chartPreciosBtnDash.addEventListener('click', muestraModal4, false);

    function muestraModal4() {
      // let cardPorc = document.getElementById("porcPeriodTextModal");
      // cardPorc.innerText = porc + "%";
      setTimeout(function() {
        let chartPreciosModal = document.getElementById("chartPreciosModal");
        actualizaChartPrecios(chartEvolucionPrecios(chartPreciosModal), nne);
        let chartPreciosBtnDwnldDashModal = document.getElementById("chartPreciosBtnDwnldDashModal");
        chartPreciosBtnDwnldDashModal.addEventListener('click', function() {
          downloadChart(chartPreciosBtnDwnldDashModal, chartPreciosModal)
        });
      }, 500);
    };
  };

  function cargaChartComparativa(nne) {
    let chartElement4 = document.getElementById("chartComparativa");
    actualizaChartComparativa(chartComparativa(chartElement4), nne);

    let chartComparativaBtnDwnldDash = document.getElementById("chartComparativaBtnDwnldDash");
    chartComparativaBtnDwnldDash.addEventListener('click', function() {
      downloadChart(chartComparativaBtnDwnldDash, chartElement4)
    });

    let chartComparativaBtnDash = document.getElementById("chartComparativaBtnDash");
    chartComparativaBtnDash.addEventListener('click', muestraModal5, false);

    function muestraModal5() {
      // let cardPorc = document.getElementById("porcPeriodTextModal");
      // cardPorc.innerText = porc + "%";
      setTimeout(function() {
        let chartComparativaModal = document.getElementById("chartComparativaModal");
        actualizaChartComparativa(chartComparativa(chartComparativaModal), nne);
        let chartComparativaBtnDwnldDashModal = document.getElementById("chartComparativaBtnDwnldDashModal");
        chartComparativaBtnDwnldDashModal.addEventListener('click', function() {
          downloadChart(chartComparativaBtnDwnldDashModal, chartComparativaModal)
        });
      }, 500);
    };
  };

  function chartEvolPxProv(nne) {
    let chartElement5 = document.getElementById("chartEvolPxProv");
    actualizaChartComxProv(chartComEnt(chartElement5), nne);

    let chartEvolPxProvBtnDwnldDash = document.getElementById("chartEvolPxProvBtnDwnldDash");
    chartEvolPxProvBtnDwnldDash.addEventListener('click', function() {
      downloadChart(chartEvolPxProvBtnDwnldDash, chartElement5)
    });

    let chartEvolPxProvBtnDash = document.getElementById("chartEvolPxProvBtnDash");
    chartEvolPxProvBtnDash.addEventListener('click', muestraModal6, false);

    function muestraModal6() {
      setTimeout(function() {
        let chartEvolPxProvModal = document.getElementById("chartEvolPxProvModal");
        actualizaChartComxProv(chartComEnt(chartEvolPxProvModal), nne);
        let chartEvolPxProvBtnDwnldDashModal = document.getElementById("chartEvolPxProvBtnDwnldDashModal");
        chartEvolPxProvBtnDwnldDashModal.addEventListener('click', function() {
          downloadChart(chartEvolPxProvBtnDwnldDashModal, chartEvolPxProvModal)
        });
      }, 500);
    };
  };

  function cargaChartPxQCom(nne) {
    let chartElement6 = document.getElementById("chartEvolPxQxCom");
    actualizaChartComparativaPxQxProd(chartComparativaPxQxProd(chartElement6), nne);

    let chartEvolPxQxComBtnDwnldDash = document.getElementById("chartEvolPxQxComBtnDwnldDash");
    chartEvolPxQxComBtnDwnldDash.addEventListener('click', function() {
      downloadChart(chartEvolPxQxComBtnDwnldDash, chartElement6)
    });

    let chartEvolPxQxComBtnDash = document.getElementById("chartEvolPxQxComBtnDash");
    chartEvolPxQxComBtnDash.addEventListener('click', muestraModal7, false);

    function muestraModal7() {
      setTimeout(function() {
        let chartEvolPxQxComModal = document.getElementById("chartEvolPxQxComModal");
        actualizaChartComparativaPxQxProd(chartComparativaPxQxProd(chartEvolPxQxComModal), nne);
        let chartEvolPxQxComBtnDwnldDashModal = document.getElementById("chartEvolPxQxComBtnDwnldDashModal");
        chartEvolPxQxComBtnDwnldDashModal.addEventListener('click', function() {
          downloadChart(chartEvolPxQxComBtnDwnldDashModal, chartEvolPxQxComModal)
        });
      }, 500);
    };
  };


  function cargaChartComercialesJuntos(nne){

    let chartElement7 = document.getElementById("chartComercialesJuntos");
    let chartJuntos = grafComJuntos(chartElement7);
    // actualizaChartComercialesJuntos(grafComJuntos(chartElement7), nne);
    actualizaChartComercialesJuntos(chartJuntos, nne);

    let btnToggle = document.getElementById("btnToggleLabel");
    btnToggle.addEventListener('click', function() {
      toggleLabel(chartJuntos, btnToggle)
    });

    legendComDisplay(chartJuntos, btnToggle, 1);

    let chartComercialesJuntosBtnDwnldDash = document.getElementById("chartComercialesJuntosBtnDwnldDash");
    chartComercialesJuntosBtnDwnldDash.addEventListener('click', function() {
      downloadChart(chartComercialesJuntosBtnDwnldDash, chartElement7)
    });

    let chartComercialesJuntosBtnDash = document.getElementById("chartComercialesJuntosBtnDash");
    chartComercialesJuntosBtnDash.addEventListener('click', muestraModal8, false);

    function muestraModal8() {
      setTimeout(function() {
        let chartComercialesJuntosModal = document.getElementById("chartComercialesJuntosModal");
        actualizaChartComercialesJuntos(grafComJuntos(chartComercialesJuntosModal), nne, btnToggle);
        let chartComercialesJuntosBtnDwnldDashModal = document.getElementById("chartComercialesJuntosBtnDwnldDashModal");
        chartComercialesJuntosBtnDwnldDashModal.addEventListener('click', function() {
          downloadChart(chartComercialesJuntosBtnDwnldDashModal, chartComercialesJuntosModal)
        });
      }, 500);
    };
  };

});
