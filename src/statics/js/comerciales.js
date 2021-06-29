window.addEventListener('load', function() {

  let $tblComTodos = $('#tblComTodos');
  let $tblPreciosComercial = $('#tblPreciosComercial');



  // let $tblComerciales = $('#tblComerciales');
  // let $tblMedianas = $('#tblMedianas');
  // let $tblComercialesXMediana = $('#tblComercialesXMediana')

  let table = document.getElementById("tblComTodos");

  let buscador = document.getElementById("txtBuscador5");
  buscador.addEventListener("keyup", buscaTxtCom);

  let btnBuscador = document.getElementById("btnSearch5");
  btnBuscador.addEventListener("click", buscaTxtCom);

  let btnRefresh = document.getElementById("btnClear5");
  btnRefresh.addEventListener("click", function(){
    buscador.value = "";
    buscaTxtCom();
  });

  function buscaTxtCom() {
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

  function operateFormatter(value, row, index) {
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
      '<a class="chrtComMed mx-1" id="idChartCM' + JSON.parse(JSON.stringify(row)).CodCABA + '" name="' + JSON.parse(JSON.stringify(row)).CodCABA + '" href="#modalComerciales" role="button" data-toggle="modal" data-toggle="tooltip" title="Evolución del comercial">',
      '<i class="fa fa-chart-line"></i>',
      '</a>  '
    ].join('');

    return htmlNNE;
  };

  // function formatoPrecioMediana(value, row, index){
  //   let elHTML = '<span>'+value+'</span>'
  //   if (row.Considerado == 0){
  //     elHTML += '&nbsp;&nbsp;&nbsp;&nbsp;<span class="right badge badge-danger" data-toggle="tooltip" title="'+ row.Causa +'">X</span>';
  //   };
  //   return elHTML;
  // };

  // window.operateEvents = {
  //   'click .like': function(e, value, row, index) {
  //     // alert('You click like action, row: ' + JSON.stringify(row))
  //     alert('You click like action, row: ' + JSON.parse(JSON.stringify(row)).nne);
  //   },
  //   'click .remove': function(e, value, row, index) {
  //     $tblGenericos.bootstrapTable('remove', {
  //       field: 'NNE',
  //       values: [row.NNE]
  //     });
  //   }
  // };

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

  function configuraChartComercialesXMediana() {
    let arrBtnChart = document.getElementsByClassName("chrtComMed");
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

  function configuraTblEVolComerciales() {
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

  function initTableEvolComerciales(codComb) {

    limpiaTabla($tblPreciosComercial);

    $tblPreciosComercial.bootstrapTable('destroy').bootstrapTable(
      construyeTablaEvolComernciales(codComb)
    );
    // configuraChartComerciales();
    // configuraTblComerciales();
  };

  function initTable() {

    limpiaTabla($tblComTodos);

    let data = getComercialesTodos();

    $tblComTodos.bootstrapTable('destroy').bootstrapTable({
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
            sortable: true
            // footerFormatter: totalTextFormatter
          },
          {
            field: 'Comercial',
            title: 'Comercial',
            sortable: true,
            // footerFormatter: totalNameFormatter,
            align: 'left'
          }, {
            field: 'Unidades',
            title: 'Unidades',
            sortable: true,
            align: 'center'
            // formatter: formatoCash,
            // footerFormatter: totalPriceFormatter
          }, {
            field: 'Laboratorio',
            title: 'Laboratorio',
            sortable: true,
            align: 'center'
            // formatter: formatoCash,
            // footerFormatter: totalPriceFormatter
          },
          {
            field: 'CodCombinado',
            title: 'Código',
            sortable: true,
            align: 'center'
            // formatter: formatoCash,
            // footerFormatter: totalPriceFormatter
          },
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
    // configuraChartMediana();
    // configuraTblComerciales();
    // configuraTblMedianas();
    configuraChartComerciales();
    configuraTblEVolComerciales();
  };

  //
  // function initTableComerciales(nne) {
  //
  //   limpiaTabla($tblComerciales);
  //
  //   let data = getComercialesXnneUnicos(nne);
  //
  //   $tblComerciales.bootstrapTable('destroy').bootstrapTable(
  //     construyeTablaComernciales(nne)
  //     //   {
  //     //   height: 550,
  //     //   locale: "es-AR",
  //     //   data: data,
  //     //   columns: [
  //     //     // [
  //     //       // {
  //     //       //   field: 'state',
  //     //       //   checkbox: true,
  //     //       //   // rowspan: 2,
  //     //       //   align: 'center',
  //     //       //   valign: 'middle'
  //     //       // },
  //     //       {
  //     //         field: 'NNE',
  //     //         title: 'NNE',
  //     //         // rowspan: 2,
  //     //         align: 'center',
  //     //         // valign: 'middle',
  //     //         sortable: true,
  //     //         // footerFormatter: totalTextFormatter
  //     //       },
  //     //       {
  //     //         field: 'CodCombinado',
  //     //         title: 'Código',
  //     //         sortable: true,
  //     //         // footerFormatter: totalNameFormatter,
  //     //         align: 'left'
  //     //       }, {
  //     //         field: 'Comercial',
  //     //         title: 'Descripcion',
  //     //         sortable: true,
  //     //         align: 'center',
  //     //         // formatter: formatoCash,
  //     //         // footerFormatter: totalPriceFormatter
  //     //       },
  //     //       {
  //     //         field: 'Laboratorio',
  //     //         title: 'Laboratorio',
  //     //         sortable: true,
  //     //         align: 'center',
  //     //         // formatter: formatoCash,
  //     //         // footerFormatter: totalPriceFormatter
  //     //       }, {
  //     //         field: 'operate',
  //     //         title: 'Acciones',
  //     //         align: 'center',
  //     //         clickToSelect: false,
  //     //         events: window.operateEvents,
  //     //         formatter: operateFormatterComerciales
  //     //       }
  //     //     ]
  //     //   // ]
  //     // }
  //   );
  //   configuraChartComerciales();
  //   // configuraTblComerciales();
  // };
  //
  // function initTableMedianas(nne) {
  //
  //   limpiaTabla($tblMedianas);
  //
  //   let data = getObjMedianas(nne);
  //
  //   $tblMedianas.bootstrapTable('destroy').bootstrapTable({
  //     height: 550,
  //     locale: "es-AR",
  //     data: data,
  //     columns: [
  //       [
  //         // {
  //         //   field: 'state',
  //         //   checkbox: true,
  //         //   // rowspan: 2,
  //         //   align: 'center',
  //         //   valign: 'middle'
  //         // },
  //         {
  //           field: 'Fecha',
  //           title: 'Fecha',
  //           // rowspan: 2,
  //           align: 'center',
  //           // valign: 'middle',
  //           sortable: true,
  //           // footerFormatter: totalTextFormatter
  //         },
  //         {
  //           field: 'Mediana',
  //           title: 'Mediana $',
  //           sortable: true,
  //           // footerFormatter: totalNameFormatter,
  //           align: 'center'
  //         }, {
  //           field: 'operate',
  //           title: 'Acciones',
  //           align: 'center',
  //           clickToSelect: false,
  //           events: window.operateEvents,
  //           formatter: operateFormatterMedianas
  //         }
  //       ]
  //     ]
  //   });
  //   configuraTblComercialesMediana();
  //   // configuraTblComerciales();
  // };
  //
  // function initTableComercialesXMediana(fecha, nne) {
  //
  //   limpiaTabla($tblComercialesXMediana);
  //
  //   let data = getComercialesXnneYFecha(fecha, nne);
  //
  //   $tblComercialesXMediana.bootstrapTable('destroy').bootstrapTable({
  //     height: 550,
  //     locale: "es-AR",
  //     data: data,
  //     columns: [
  //       [
  //         // {
  //         //   field: 'state',
  //         //   checkbox: true,
  //         //   // rowspan: 2,
  //         //   align: 'center',
  //         //   valign: 'middle'
  //         // },
  //         {
  //           field: 'NNE',
  //           title: 'NNE',
  //           // rowspan: 2,
  //           align: 'center',
  //           // valign: 'middle',
  //           sortable: true,
  //           // footerFormatter: totalTextFormatter
  //         },
  //         {
  //           field: 'CodCombinado',
  //           title: 'Código',
  //           sortable: true,
  //           formatter: formatoPrecioMediana,
  //           align: 'left'
  //         }, {
  //           field: 'Comercial',
  //           title: 'Descripcion',
  //           sortable: true,
  //           align: 'center',
  //           // formatter: formatoCash,
  //           // footerFormatter: totalPriceFormatter
  //         }, {
  //           field: 'PrecPubUni',
  //           title: 'Precio $',
  //           sortable: true,
  //           align: 'center',
  //           // formatter: formatoPrecioMediana,
  //           // footerFormatter: totalPriceFormatter
  //         }, {
  //           field: 'FechaVigecia',
  //           title: 'Fecha de Actualización',
  //           sortable: true,
  //           align: 'center',
  //           formatter: stringGuionesToDate,
  //           // footerFormatter: totalPriceFormatter
  //         }, {
  //           field: 'operate',
  //           title: 'Acciones',
  //           align: 'center',
  //           clickToSelect: false,
  //           events: window.operateEvents,
  //           formatter: operateFormatterComercialesXMediana
  //         }
  //       ]
  //     ]
  //   });
  //   configuraChartComercialesXMediana();
  //   // configuraTblComerciales();
  //
  // };
  //

  initTable();
  buscador.focus();

});
