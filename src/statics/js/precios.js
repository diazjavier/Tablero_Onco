window.addEventListener('load', function() {

  let buscador = document.getElementById("txtBuscador");
  // let buscador2 = document.getElementById("txtBuscador2");
  let listado = document.getElementById("productos");
  // let listado2 = document.getElementById("productos2");
  let btnSearch = document.getElementById("btnSearch");
  // let btnSearch2 = document.getElementById("btnSearch2");
  let btnClear = document.getElementById("btnClear");
  let lblAlert = document.getElementById("lblAlert");

  let lblNomebreNNE = document.getElementById("nombreNNE");
  lblNomebreNNE.innerHTML = "";

  let lblModeloNNE = document.getElementById("modeloNNE");
  lblModeloNNE.innerHTML = "";


  let cookNne = getCookie("nne");
  if (cookNne && cookNne != "") {
    muestraProducto(cookNne);
  };

  buscador.addEventListener('keyup', function(e) {
    if (getTecla(e) === 13) {
      muestraProducto(seleccionaProducto(listado, buscador.value))
    };
  }, false);

  listado.addEventListener('keyup', function(e) {
    if (getTecla(e) === 13) {
      muestraProducto(seleccionaProducto(listado, buscador.value))
    };
  }, false);

  btnSearch.addEventListener('click', function() {
    muestraProducto(seleccionaProducto(listado, buscador.value))
  }, false);
  btnClear.addEventListener('click', function() {
    limpiaTxt(buscador)
  }, false);

  // let fechaInicial = document.getElementById("fechaInicial");
  // fechaInicial.innerHTML = "";

  // Obtengo las fuentes de datos
  let cabeceras = Headers;
  let detalle = Detalle;
  let productosComerciales = Comerciales;

  // Cargo el combo de Productos
  cargaPrductos(cabeceras, listado);
  buscador.focus();

  function muestraProducto(nneSelected) {
    // let nneSelected = seleccionaProducto(listado, buscador.value);
    if (nneSelected == "") {
      // alert("No se encontraron resultados para este criterio de búsqueda");
      limpiaTxt(buscador);
      lblAlert.innerHTML = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" +
        "<p><strong>No se encontraron resultados para este criterio de búsqueda</strong></p> <p>Intente nuevamente</p>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
        "<span aria-hidden='true'>&times;</span>" +
        "</button>" +
        "</div>";
      // location.reload();
    } else {
      lblAlert.innerHTML = "";
      setCookie(nneSelected);
      actualizaPreciosNNE(nneSelected);
      limpiaTxt(buscador);
    };
  };

  function actualizaPreciosNNE(nne) {

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
    lblNomebreNNE.innerHTML = nne + " - " + lblNom + " " + lblMod;
    lblModeloNNE.innerHTML = lblDesc;

    let medianas = getMedianaNNE(nne);

    let valorMin = medianas.valorMin;
    let valorMax = medianas.valorMax;
    let pP1Inicial = medianas.pP1Inicial;
    let pP1Actual = medianas.pP1Actual;
    let pP2Inicial = medianas.pP2Inicial;
    let pP2Actual = medianas.pP2Actual;

    // Datos de Medianas
    let medianaInicial = document.getElementById("medianaInicial");
    if (valorMin != null) {
      medianaInicial.innerHTML = "$" + valorMin.toString().replace('.', ',') + ".-";
    } else {
      medianaInicial.innerHTML = "";
    };

    let medianaActual = document.getElementById("medianaActual");
    if (valorMax != null) {
      medianaActual.innerHTML = "$" + valorMax.toString().replace('.', ',') + ".-";
    } else {
      medianaActual.innerHTML = "";
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

    // Datos de Precios de Proveedores
    let precioP1Inicial = document.getElementById("precioP1Inicial");
    if (pP1Inicial != null) {
      precioP1Inicial.innerHTML = "$" + pP1Inicial.toString().replace('.', ',') + ".-";
    } else {
      precioP1Inicial.innerHTML = "";
    };

    let precioP1Actual = document.getElementById("precioP1Actual");
    if (pP1Actual != null) {
      precioP1Actual.innerHTML = "$" + pP1Actual.toString().replace('.', ',') + ".-";
    } else {
      precioP1Actual.innerHTML = "";
    };

    let difPesosP1 = document.getElementById("difPesosP1");
    if (pP1Inicial != null && pP1Actual != null) {
      difPesosP1.innerHTML = "$" + (pP1Actual - pP1Inicial).toFixed(2).toString().replace('.', ',') + ".-";
    } else {
      difPesosP1.innerHTML = "";
    };

    let difPorcP1 = document.getElementById("difPorcP1");
    if (pP1Inicial != null && pP1Actual != null) {
      difPorcP1.innerHTML = (((pP1Actual - pP1Inicial) * 100) / pP1Inicial).toFixed(2).toString().replace('.', ',') + "%";
    } else {
      difPorcP1.innerHTML = "";
    };

    let precioP2Inicial = document.getElementById("precioP2Inicial");
    if (pP2Inicial != null) {
      precioP2Inicial.innerHTML = "$" + pP2Inicial.toString().replace('.', ',') + ".-";
    } else {
      precioP2Inicial.innerHTML = "";
    };

    let precioP2Actual = document.getElementById("precioP2Actual");
    if (pP2Actual != null) {
      precioP2Actual.innerHTML = "$" + pP2Actual.toString().replace('.', ',') + ".-";
    } else {
      precioP2Actual.innerHTML = "";
    };

    let difPesosP2 = document.getElementById("difPesosP2");
    if (pP2Inicial != null && pP2Actual != null) {
      difPesosP2.innerHTML = "$" + (pP2Actual - pP2Inicial).toFixed(2).toString().replace('.', ',') + ".-";
    } else {
      difPesosP2.innerHTML = "";
    };

    let difPorcP2 = document.getElementById("difPorcP2");
    if (pP2Inicial != null && pP2Actual != null) {
      difPorcP2.innerHTML = (((pP2Actual - pP2Inicial) * 100) / pP2Inicial).toFixed(2).toString().replace('.', ',') + "%";
    } else {
      difPorcP2.innerHTML = "";
    };

    let chartElement = document.getElementById("boxplotMedianas");
    actualizaChartBoxPlotMedianas(chartBoxPlotMedianas(chartElement), nne);

    let boxplotMedianasBtnDwnld = document.getElementById("boxplotMedianasBtnDwnld");
    boxplotMedianasBtnDwnld.addEventListener('click', function() {
      downloadChart(boxplotMedianasBtnDwnld, chartElement)
    });

    let boxplotMedianasBtn = document.getElementById("boxplotMedianasBtn");
    boxplotMedianasBtn.addEventListener('click', muestraModal3, false);

    function muestraModal3() {
      // let cardPorc = document.getElementById("porcPeriodTextModal");
      // cardPorc.innerText = porc + "%";
      setTimeout(function() {
        let boxplotMedianasModal = document.getElementById("boxplotMedianasModal");
        actualizaChartBoxPlotMedianas(chartBoxPlotMedianas2(boxplotMedianasModal), nne);
        let boxplotMedianasBtnDwnldModal = document.getElementById("boxplotMedianasBtnDwnldModal");
        boxplotMedianasBtnDwnldModal.addEventListener('click', function() {
          downloadChart(boxplotMedianasBtnDwnldModal, boxplotMedianasModal)
        });
      }, 500);
    };







  };

});
