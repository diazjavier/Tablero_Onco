window.addEventListener('load', function() {

  let $table = $('#tblComercialesTodos');
  let $tblPreciosComercial = $('#tblPreciosComercial');

  let table = document.getElementById("tblComercialesTodos");

  let buscador = document.getElementById("txtBuscador5");

  buscador.addEventListener("keyup", function() {
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
  });

  function operateFormatter(value, row, index){
    let htmlNNE = [
      // '<a class="like mx-1" href="javascript:void(0)" title="Evolución de las medianas">',
      '<a id="id' + JSON.parse(JSON.stringify(row)).CodCombinado + '" name="' + JSON.parse(JSON.stringify(row)).CodCombinado + '" class="btnchartcom mx-1" href="#modalChartComerciales" role="button" data-toggle="modal" data-toggle="tooltip" title="Gráfico de evolución de los precios">',
        '<i class="fa fa-chart-line"></i>',
      '</a>  ',

      '<a class="tblevolcomerciales mx-1" name="' + JSON.parse(JSON.stringify(row)).CodCombinado + '" href="#modalTblPreciosComercial" title="Evolución de los precios" data-toggle="modal">',
        '<i class="fa fa-sort-amount-up"></i>',
      '</a> ',

      // '<a class="tblcomerciales mx-1" name="' + JSON.parse(JSON.stringify(row)).CodCombinado + '" href="#modalTbl" title="Comerciales involucrados" data-toggle="modal">',
      //   '<i class="fa fa-prescription"></i>',
      // '</a>'
    ].join('');
    return htmlNNE;
  };

  function configuraChartComerciales() {
    let arrBtnChart = document.getElementsByClassName("btnchartcom");
    arrBtnChart.forEach((item, i) => {
      item.addEventListener('click', muestraModalChartCom, false);

      function muestraModalChartCom() {
        // let cardPorc = document.getElementById("porcPeriodTextModal");
        // cardPorc.innerText = porc + "%";
        setTimeout(function() {
          let elCodComb = item.getAttribute("name");
          let chrtComercial = document.getElementById("chartComercialModal2");
          actualizaChartComercialUnicoComb(chartComercialUnico(chrtComercial), elCodComb);

          let btnDwnldModalCom = document.getElementById("btnDwnldModalChartComerciales");
          btnDwnldModalCom.addEventListener('click', function() {
            downloadChart(btnDwnldModalCom, chrtComercial)
          });
        }, 500);
      };
    });
  };

  function configuraTblEVolComerciales(){
    let arrBtnTbl = document.getElementsByClassName("tblevolcomerciales");
    arrBtnTbl.forEach((item, i) => {
      item.addEventListener('click', muestraModalTblCom, false);

      function muestraModalTblCom() {
        setTimeout(function() {
          let elCodComb = item.getAttribute("name");
          initTableEvolComerciales(elCodComb);
        }, 500);
      };
    });
  };

  function initTableCom(){

    limpiaTabla($table);

    let data = getComercialesTodos();
    // let data = [{CodCombinado:"5157-4", Comercial:"La la la", Laboratorio:"LAb 123", NNE:"5002201"}];

    $table.bootstrapTable('destroy').bootstrapTable({
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
            field: 'CodCombinado',
            title: 'CodCombinado',
            // rowspan: 2,
            align: 'center',
            // valign: 'middle',
            sortable: true
            // footerFormatter: totalTextFormatter
          },
          {
            field: 'Comercial',
            title: 'Descripción',
            sortable: true,
            // footerFormatter: totalNameFormatter,
            align: 'left'
          }, {
            field: 'Laboratorio',
            title: 'Laboratorio',
            sortable: true,
            align: 'center'
            // formatter: formatoCash,
            // footerFormatter: totalPriceFormatter
          },
          {
            field: 'NNE',
            title: 'NNE relacionado',
            // rowspan: 2,
            align: 'center',
            // valign: 'middle',
            sortable: true
            // footerFormatter: totalTextFormatter
          },

          // {
          //   field: 'medianaActual',
          //   title: 'Mediana Actual $',
          //   sortable: true,
          //   align: 'center',
          //   // formatter: formatoCash,
          //   // footerFormatter: totalPriceFormatter
          // }, {
          //   field: 'porc',
          //   title: 'Diferencia %',
          //   sortable: true,
          //   align: 'center',
          //   // formatter: formatoCash,
          //   // footerFormatter: totalPriceFormatter
          // },
          {
            field: 'operate',
            title: 'Gráficos y Reportes',
            align: 'center',
            clickToSelect: false,
            events: window.operateEvents,
            formatter: operateFormatter
          }
        ]
      ]
    });
    // Configuro los botones de la tabla
    configuraChartComerciales();
    configuraTblEVolComerciales();
    // configuraTblMedianas();
  };

  function initTableEvolComerciales(codComb) {

    limpiaTabla($tblPreciosComercial);

    $tblPreciosComercial.bootstrapTable('destroy').bootstrapTable(
      construyeTablaEvolComernciales(codComb)
    );
    // configuraChartComerciales();
    // configuraTblComerciales();
  };

  initTableCom();
  buscador.focus();

});
