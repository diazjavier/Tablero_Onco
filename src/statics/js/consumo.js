window.addEventListener('load', function() {

  let buscador2 = document.getElementById("txtBuscador2");
  // let buscador2 = document.getElementById("txtBuscador2");
  let listado2 = document.getElementById("productos2");
  // let listado2 = document.getElementById("productos2");
  let btnSearch2 = document.getElementById("btnSearch2");
  // let btnSearch2 = document.getElementById("btnSearch2");
  let btnClear2 = document.getElementById("btnClear2");
  let lblAlert2 = document.getElementById("lblAlert2");

  let lblNomebreNNE2 = document.getElementById("nombreNNE2");
  lblNomebreNNE2.innerHTML = "";

  let lblModeloNNE2 = document.getElementById("modeloNNE2");
  lblModeloNNE2.innerHTML = "";


  let cookNne = getCookie("nne");
  if (cookNne && cookNne != ""){
    muestraProducto2(cookNne);
  };

  buscador2.addEventListener('keyup', function(e) {
    if (getTecla(e) === 13) {
      muestraProducto2(seleccionaProducto(listado2, buscador2.value))
    };
  }, false);

  listado2.addEventListener('keyup', function(e) {
    if (getTecla(e) === 13) {
      muestraProducto2(seleccionaProducto(listado2, buscador2.value))
    };
  }, false);

  btnSearch2.addEventListener('click', function(){muestraProducto2(seleccionaProducto(listado2, buscador2.value))}, false);
  btnClear2.addEventListener('click', function(){limpiaTxt(buscador2)}, false);

  // let fechaInicial = document.getElementById("fechaInicial");
  // fechaInicial.innerHTML = "";

  // Obtengo las fuentes de datos
  let cabeceras = Headers;
  let detalle = Detalle;
  let productosComerciales = Comerciales;

  // Cargo el combo de Productos
  cargaPrductos(cabeceras, listado2);
  buscador2.focus();

  function muestraProducto2(nneSelected) {
    // let nneSelected = seleccionaProducto(listado, buscador.value);
    if (nneSelected == "") {
      // alert("No se encontraron resultados para este criterio de búsqueda");
      limpiaTxt(buscador2);
      lblAlert2.innerHTML = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>" +
        "<p><strong>No se encontraron resultados para este criterio de búsqueda</strong></p> <p>Intente nuevamente</p>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
        "<span aria-hidden='true'>&times;</span>" +
        "</button>" +
        "</div>";
      // location.reload();
    } else {
      lblAlert2.innerHTML = "";
      setCookie(nneSelected);
      actualizaConsumosNNE(nneSelected);
      limpiaTxt(buscador2);
    };
  };

  function actualizaConsumosNNE(nne){
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
    lblNomebreNNE2.innerHTML = nne + " - " + lblNom + " " + lblMod;
    lblModeloNNE2.innerHTML = lblDesc;

    let consumos = getConsumosNNE(nne)

    let QAnualTotal = consumos.QAnualTotal;
    let QtPeriod = consumos.QtPeriod;
    let QAnualP1 = consumos.QAnualP1;
    let QP1Period = consumos.QP1Period;
    let QAnualP2 = consumos.QAnualP2;
    let QP2Period = consumos.QP2Period;

    // Datos de Q (Consumo)
    let QtAnual = document.getElementById("QtAnual");
    if(QAnualTotal != null){
      QtAnual.innerHTML = QAnualTotal;
    }else{
      QtAnual.innerHTML = "";
    };

    let QDelPeriodo = document.getElementById("QDelPeriodo");
    if(QtPeriod != null){
      QDelPeriodo.innerHTML = QtPeriod;
    }else{
      QDelPeriodo.innerHTML = "";
    };

    let QtAnualP1 = document.getElementById("QtAnualP1");
    if(QAnualP1 != null){
      QtAnualP1.innerHTML = QAnualP1;
    }else{
      QtAnualP1.innerHTML = "";
    };

    let QDelPeriodoP1 = document.getElementById("QDelPeriodoP1");
    if(QP1Period != null){
      QDelPeriodoP1.innerHTML = QP1Period;
    }else{
      QDelPeriodoP1.innerHTML = "";
    };

    let QtAnualP2 = document.getElementById("QtAnualP2");
    if(QAnualP2 != null){
      QtAnualP2.innerHTML = QAnualP2;
    }else{
      QtAnualP2.innerHTML = "";
    };

    let QDelPeriodoP2 = document.getElementById("QDelPeriodoP2");
    if(QP2Period != null){
      QDelPeriodoP2.innerHTML = QP2Period;
    }else{
      QDelPeriodoP2.innerHTML = "";
    };

    let consumoxNNE = document.getElementById("consumoxNNE");
    actualizaChartQxNNE(getChartQxNNE(consumoxNNE), nne);

    let consumoxNNEBtnDwnld = document.getElementById("consumoxNNEBtnDwnld");
    consumoxNNEBtnDwnld.addEventListener('click', function() {
      downloadChart(consumoxNNEBtnDwnld, consumoxNNE)
    });

    let consumoxNNEBtn = document.getElementById("consumoxNNEBtn");
    consumoxNNEBtn.addEventListener('click', muestraModal4, false);

    function muestraModal4() {
      // let cardPorc = document.getElementById("porcPeriodTextModal");
      // cardPorc.innerText = porc + "%";
      setTimeout(function() {
        let consumoxNNEModal = document.getElementById("consumoxNNEModal");
        actualizaChartQxNNE(getChartQxNNE(consumoxNNEModal), nne);
        let consumoxNNEBtnDwnldModal = document.getElementById("consumoxNNEBtnDwnldModal");
        consumoxNNEBtnDwnldModal.addEventListener('click', function() {
          downloadChart(consumoxNNEBtnDwnldModal, consumoxNNEModal)
        });
      }, 500);
    };



  };
});
