window.addEventListener('load', function() {

  let $tblGenericos = $('#tblGenericos');
  let $tblComerciales = $('#tblComerciales');
  let $tblMedianas = $('#tblMedianas');
  let $tblComercialesXMediana = $('#tblComercialesXMediana')

  let table = document.getElementById("tblGenericos");

  let buscador = document.getElementById("txtBuscador4");
  buscador.addEventListener("keyup", buscaTxt);

  let btnBuscador = document.getElementById("btnSearch4");
  btnBuscador.addEventListener("click", buscaTxt);

  let btnRefresh = document.getElementById("btnClear4");
  btnRefresh.addEventListener("click", function(){
    buscador.value = "";
    buscaTxt();
  });

  function buscaTxt(){
    // let input, filter, table, tr, td, i, txtValue;
    let criterio = buscador.value.toUpperCase();
    let tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      let row = tr[i].getElementsByTagName("td");
      for (j = 0; j < row.length; j++) {
        let td = row[j];
        if (td) {
          let txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(criterio) > -1) {
            tr[i].style.display = "";
            break;
          } else {
            tr[i].style.display = "none";
          };
        };
      };
    };
  };

  function operateFormatterMedianas(value, row, index) {
    let htmlNNE = [
      // '<a class="like mx-1" href="javascript:void(0)" title="Evolución de las medianas">',
      '<a class="comMed mx-1" id="id' + JSON.parse(JSON.stringify(row)).NNE + '" name="' + JSON.parse(JSON.stringify(row)).NNE + '" date="' + JSON.parse(JSON.stringify(row)).fechaOrig + '" href="#modalTblComercialesXMediana" role="button" data-toggle="modal" data-toggle="tooltip" title="Composición de la mediana">',
      '<i class="fa fa-prescription"></i>',
      '</a>  '
    ].join('');
    return htmlNNE;
  };

  function operateFormatterComercialesXMediana(value, row, index) {
    let htmlNNE = [
      // '<a class="like mx-1" href="javascript:void(0)" title="Evolución de las medianas">',
      // '<a class="chrtComMed mx-1" id="idChartCM' + JSON.parse(JSON.stringify(row)).CodCABA + '" name="' + JSON.parse(JSON.stringify(row)).CodCABA + '" href="#modalComerciales" role="button" data-toggle="modal" data-toggle="tooltip" title="Evolución del comercial">',
      '<a class="chrtComMed mx-1" id="idChartCM' + JSON.parse(JSON.stringify(row)).CodCombinado + '" name="' + JSON.parse(JSON.stringify(row)).CodCombinado + '" href="#modalComerciales" role="button" data-toggle="modal" data-toggle="tooltip" title="Evolución del comercial">',
      '<i class="fa fa-chart-line"></i>',
      '</a>  '
    ].join('');

    return htmlNNE;
  };

  function configuraTblMedianas() {
    let arrBtnTblM = document.getElementsByClassName("tblmedianas");
    arrBtnTblM.forEach((item, i) => {
      item.addEventListener('click', muestraModalTblNNEMedianas, false);

      function muestraModalTblNNEMedianas() {
        setTimeout(function() {
          let elNNE = item.getAttribute("name");
          initTableMedianas(elNNE);
        }, 500);
      };
    });
  };

  function configuraTblComerciales() {
    let arrBtnTbl = document.getElementsByClassName("tblcomerciales");
    arrBtnTbl.forEach((item, i) => {
      item.addEventListener('click', muestraModalTblNNE, false);

      function muestraModalTblNNE() {
        setTimeout(function() {
          let elNNE = item.getAttribute("name");
          initTableComerciales(elNNE);
        }, 500);
      };
    });
  };

  function configuraTblComercialesMediana() {
    let arrBtnTblCM = document.getElementsByClassName("comMed");
    arrBtnTblCM.forEach((item, i) => {
      item.addEventListener('click', muestraModalTblCM, false);

      function muestraModalTblCM() {
        setTimeout(function() {
          let elNNE = item.getAttribute("name");
          let fechaCM = item.getAttribute("date");
          initTableComercialesXMediana(fechaCM, elNNE);
        }, 500);
      };
    });
  };

  function configuraChartMediana() {
    let arrBtnChart = document.getElementsByClassName("btnchart");
    arrBtnChart.forEach((item, i) => {
      item.addEventListener('click', muestraModalNNE, false);

      function muestraModalNNE() {
        // let cardPorc = document.getElementById("porcPeriodTextModal");
        // cardPorc.innerText = porc + "%";
        setTimeout(function() {
          let elNNE = item.getAttribute("name");
          chrtMedianas = document.getElementById("boxplotMedianasModa");
          actualizaChartBoxPlotMedianas(chartBoxPlotMedianas(chrtMedianas, elNNE), elNNE);

          btnDwnldModal = document.getElementById("btnDwnldModal");
          btnDwnldModal.addEventListener('click', function() {
            downloadChart(btnDwnldModal, chrtMedianas)
          });
        }, 500);
      };
    });
  };

  function configuraChartComercialesXMediana() {

    let arrBtnChart = document.getElementsByClassName("chrtComMed");
    arrBtnChart.forEach((item, i) => {
      item.addEventListener('click', muestraModalChartCom, false);

      function muestraModalChartCom() {
        // let cardPorc = document.getElementById("porcPeriodTextModal");
        // cardPorc.innerText = porc + "%";
        setTimeout(function() {
          let elCodigo = item.getAttribute("name");
          chrtComercial = document.getElementById("chartComercialModal");
          // actualizaChartComercialUnico(chartComercialUnico(chrtComercial), elCodCaba);
          actualizaChartComercialUnicoComb(chartComercialUnico(chrtComercial), elCodigo);

          btnDwnldModalCom = document.getElementById("btnDwnldModalComerciales");
          btnDwnldModalCom.addEventListener('click', function() {
            downloadChart(btnDwnldModalCom, chrtComercial)
          });
        }, 500);
      };
    });

  };

  function configuraChartComerciales() {

    let arrBtnChart = document.getElementsByClassName("chrtCom");
    arrBtnChart.forEach((item, i) => {
      item.addEventListener('click', muestraModalChartCom, false);

      function muestraModalChartCom() {
        // let cardPorc = document.getElementById("porcPeriodTextModal");
        // cardPorc.innerText = porc + "%";
        setTimeout(function() {
          let elCodCaba = item.getAttribute("name");
          chrtComercial = document.getElementById("chartComercialModal");
          actualizaChartComercialUnico(chartComercialUnico(chrtComercial), elCodCaba);

          btnDwnldModalCom = document.getElementById("btnDwnldModalComerciales");
          btnDwnldModalCom.addEventListener('click', function() {
            downloadChart(btnDwnldModalCom, chrtComercial)
          });
        }, 500);
      };
    });
  };

  function initTable() {

    limpiaTabla($tblGenericos);

    $tblGenericos.bootstrapTable('destroy').bootstrapTable(
      construyeTablaMedianas()
    );
    // Configuro los botones de la tabla
    configuraChartMediana();
    configuraTblMedianas();
    configuraTblComerciales();
  };

  function initTableComerciales(nne) {

    limpiaTabla($tblComerciales);

    // let data = getComercialesXnneUnicos(nne);

    $tblComerciales.bootstrapTable('destroy').bootstrapTable(
      construyeTablaComernciales(nne)
    );
    configuraChartComerciales();
  };

  function initTableMedianas(nne) {

    limpiaTabla($tblMedianas);

    let data = getObjMedianas(nne);

    $tblMedianas.bootstrapTable('destroy').bootstrapTable({
      height: 550,
      locale: "es-AR",
      data: data,
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
            field: 'NNE',
            title: 'NNE',
            // rowspan: 2,
            align: 'center',
            // valign: 'middle',
            sortable: true,
            // footerFormatter: totalTextFormatter
          },
          {
            field: 'Fecha',
            title: 'Fecha',
            // rowspan: 2,
            align: 'center',
            // valign: 'middle',
            sortable: true,
            // footerFormatter: totalTextFormatter
          },
          {
            field: 'Mediana',
            title: 'Mediana $',
            sortable: true,
            // footerFormatter: totalNameFormatter,
            align: 'center'
          }, {
            field: 'operate',
            title: 'Acciones',
            align: 'center',
            clickToSelect: false,
            events: window.operateEvents,
            formatter: operateFormatterMedianas
          }
        ]
      ]
    });
    configuraTblComercialesMediana();
    // configuraTblComerciales();
  };

  function initTableComercialesXMediana(fecha, nne) {

    limpiaTabla($tblComercialesXMediana);

    let data = getComercialesXnneYFecha(fecha, nne);

    $tblComercialesXMediana.bootstrapTable('destroy').bootstrapTable({
      height: 550,
      locale: "es-AR",
      data: data,
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
            formatter: formatoPrecioMediana,
            align: 'left'
          }, {
            field: 'Comercial',
            title: 'Descripcion',
            sortable: true,
            align: 'center',
            // formatter: formatoCash,
            // footerFormatter: totalPriceFormatter
          }, {
            field: 'PrecPubUni',
            title: 'Precio $',
            sortable: true,
            align: 'center',
            formatter: formatoPrecioMediana
            // footerFormatter: totalPriceFormatter
          }, {
            field: 'Fecha',
            title: 'Fecha',
            sortable: true,
            align: 'center',
            formatter: stringToDate,
            // footerFormatter: totalPriceFormatter
          }, {
            field: 'FechaVigecia',
            title: 'Última actualización',
            sortable: true,
            align: 'center',
            formatter: stringGuionesToDate,
            // footerFormatter: totalPriceFormatter
          }, {
            field: 'operate',
            title: 'Acciones',
            align: 'center',
            clickToSelect: false,
            events: window.operateEvents,
            formatter: operateFormatterComercialesXMediana
          }
        ]
      ]
    });
    configuraChartComercialesXMediana();
    // configuraTblComerciales();

  };


  initTable();
  buscador.focus();

});
